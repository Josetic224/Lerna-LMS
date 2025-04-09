// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./LernaAccessControl.sol";
import "./TrackManager.sol";

/**
 * @title EnrollmentManager
 * @dev Manages student enrollments and progression through tracks
 */
contract EnrollmentManager {
    LernaAccessControl private accessControl;
    TrackManager private trackManager;
    
    // Structs
    struct Enrollment {
        uint256 trackId;
        address student;
        uint256 currentStage;
        uint256 enrolledAt;
        bool isCompleted;
        uint256 completedAt;
    }
    
    struct StageProgress {
        bool isSubmitted;
        bool isApproved;
        uint256 score;
        string submissionURI; // IPFS URI for submission
        uint256 submittedAt;
        uint256 evaluatedAt;
    }
    
    // Mappings
    mapping(address => mapping(uint256 => Enrollment)) public enrollments; // student => trackId => Enrollment
    mapping(address => mapping(uint256 => mapping(uint256 => StageProgress))) public stageProgress; // student => trackId => stageId => StageProgress
    mapping(address => uint256[]) public studentEnrollments; // student => array of enrolled trackIds
    
    // Events
    event StudentEnrolled(address indexed student, uint256 indexed trackId);
    event SubmissionCreated(address indexed student, uint256 indexed trackId, uint256 stageId, string submissionURI);
    event StageApproved(address indexed student, uint256 indexed trackId, uint256 stageId, uint256 score);
    event TrackCompleted(address indexed student, uint256 indexed trackId);
    
    /**
     * @dev Constructor sets the access control and track manager contracts
     * @param _accessControl Address of LernaAccessControl contract
     * @param _trackManager Address of TrackManager contract
     */
    constructor(address _accessControl, address _trackManager) {
        accessControl = LernaAccessControl(_accessControl);
        trackManager = TrackManager(_trackManager);
    }
    
    /**
     * @dev Modifier to check if caller has student role
     */
    modifier onlyStudent() {
        require(accessControl.isStudent(msg.sender), "Caller is not a student");
        _;
    }
    
    /**
     * @dev Modifier to check if caller has mentor role
     */
    modifier onlyMentor() {
        require(accessControl.isMentor(msg.sender), "Caller is not a mentor");
        _;
    }
    
    /**
     * @dev Modifier to check if caller has admin role
     */
    modifier onlyAdmin() {
        require(accessControl.isAdmin(msg.sender), "Caller is not an admin");
        _;
    }
    
    /**
     * @dev Allows a student to enroll in a track
     * @param trackId ID of the track to enroll in
     */
    function enrollInTrack(uint256 trackId) external onlyStudent {
        // Verify track exists and is active
        TrackManager.Track memory track = trackManager.getTrack(trackId);
        require(track.isActive, "Track is not active");
        
        // Verify student is not already enrolled
        require(enrollments[msg.sender][trackId].enrolledAt == 0, "Already enrolled in this track");
        
        // Create enrollment
        enrollments[msg.sender][trackId] = Enrollment({
            trackId: trackId,
            student: msg.sender,
            currentStage: 0,
            enrolledAt: block.timestamp,
            isCompleted: false,
            completedAt: 0
        });
        
        // Add to student's enrollment list
        studentEnrollments[msg.sender].push(trackId);
        
        emit StudentEnrolled(msg.sender, trackId);
    }
    
    /**
     * @dev Student submits work for a stage
     * @param trackId ID of the track
     * @param stageId ID of the stage
     * @param submissionURI IPFS URI of the submission
     */
    function submitStageWork(
        uint256 trackId,
        uint256 stageId,
        string memory submissionURI
    ) external onlyStudent {
        // Verify enrollment exists
        require(enrollments[msg.sender][trackId].enrolledAt > 0, "Not enrolled in this track");
        
        // Verify stage is the current stage or earlier (for resubmission)
        require(stageId <= enrollments[msg.sender][trackId].currentStage, "Cannot skip stages");
        
        // Create or update stage progress
        stageProgress[msg.sender][trackId][stageId] = StageProgress({
            isSubmitted: true,
            isApproved: false,
            score: 0,
            submissionURI: submissionURI,
            submittedAt: block.timestamp,
            evaluatedAt: 0
        });
        
        emit SubmissionCreated(msg.sender, trackId, stageId, submissionURI);
    }
    
    /**
     * @dev Mentor or admin approves a stage submission
     * @param student Address of the student
     * @param trackId ID of the track
     * @param stageId ID of the stage
     * @param score Score awarded for the submission
     * @param isApproved Whether the submission is approved
     */
    function evaluateSubmission(
        address student,
        uint256 trackId,
        uint256 stageId,
        uint256 score,
        bool isApproved
    ) external {
        require(accessControl.isMentor(msg.sender) || accessControl.isAdmin(msg.sender), "Caller is not authorized");
        
        // Verify enrollment and submission exist
        require(enrollments[student][trackId].enrolledAt > 0, "Student not enrolled in this track");
        require(stageProgress[student][trackId][stageId].isSubmitted, "No submission to evaluate");
        
        // Update stage progress
        StageProgress storage progress = stageProgress[student][trackId][stageId];
        progress.isApproved = isApproved;
        progress.score = score;
        progress.evaluatedAt = block.timestamp;
        
        // If approved and it's the current stage, advance to next stage
        if (isApproved && stageId == enrollments[student][trackId].currentStage) {
            Enrollment storage enrollment = enrollments[student][trackId];
            
            // Check if this was the last stage
            TrackManager.Track memory track = trackManager.getTrack(trackId);
            
            if (stageId == track.stageCount - 1) {
                // Track completed
                enrollment.isCompleted = true;
                enrollment.completedAt = block.timestamp;
                emit TrackCompleted(student, trackId);
            } else {
                // Advance to next stage
                enrollment.currentStage = stageId + 1;
            }
        }
        
        emit StageApproved(student, trackId, stageId, score);
    }
    
    /**
     * @dev Gets the enrollments for a student
     * @param student Address of the student
     * @return trackIds Array of track IDs the student is enrolled in
     */
    function getStudentEnrollments(address student) external view returns (uint256[] memory) {
        return studentEnrollments[student];
    }
    
    /**
     * @dev Gets the progress of a student in a track
     * @param student Address of the student
     * @param trackId ID of the track
     * @return Enrollment struct with enrollment information
     */
    function getEnrollment(address student, uint256 trackId) external view returns (Enrollment memory) {
        return enrollments[student][trackId];
    }
    
    /**
     * @dev Gets the progress of a student in a stage
     * @param student Address of the student
     * @param trackId ID of the track
     * @param stageId ID of the stage
     * @return StageProgress struct with stage progress information
     */
    function getStageProgress(address student, uint256 trackId, uint256 stageId) external view returns (StageProgress memory) {
        return stageProgress[student][trackId][stageId];
    }
    
    /**
     * @dev Gets the progress of all stages for a student in a track
     * @param student Address of the student
     * @param trackId ID of the track
     * @return StageProgress[] Array of stage progress structs
     */
    function getAllStageProgress(address student, uint256 trackId) external view returns (StageProgress[] memory) {
        TrackManager.Track memory track = trackManager.getTrack(trackId);
        StageProgress[] memory progress = new StageProgress[](track.stageCount);
        
        for (uint256 i = 0; i < track.stageCount; i++) {
            progress[i] = stageProgress[student][trackId][i];
        }
        
        return progress;
    }
}