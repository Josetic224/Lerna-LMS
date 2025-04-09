// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Test, console2} from "forge-std/Test.sol";
import "../src/LernaAccessControl.sol";
import "../src/TrackManager.sol";
import "../src/EnrollmentManager.sol";

contract LernaTest is Test {
    LernaAccessControl public accessControl;
    TrackManager public trackManager;
    EnrollmentManager public enrollmentManager;
    
    address public admin = address(1);
    address public mentor = address(2);
    address public student = address(3);
    
    function setUp() public {
        // Deploy contracts
        vm.startPrank(admin);
        accessControl = new LernaAccessControl();
        trackManager = new TrackManager(address(accessControl));
        enrollmentManager = new EnrollmentManager(address(accessControl), address(trackManager));
        
        // Set up roles
        accessControl.grantMentorRole(mentor);
        vm.stopPrank();
    }
    
    function testRoleAssignment() public {
        // Test admin role
        assertTrue(accessControl.isAdmin(admin));
        assertFalse(accessControl.isAdmin(mentor));
        assertFalse(accessControl.isAdmin(student));
        
        // Test mentor role
        assertTrue(accessControl.isMentor(mentor));
        assertFalse(accessControl.isMentor(admin));
        assertFalse(accessControl.isMentor(student));
        
        // Test student registration
        vm.startPrank(student);
        accessControl.registerAsStudent();
        assertTrue(accessControl.isStudent(student));
        vm.stopPrank();
    }
    
    function testTrackCreation() public {
        vm.startPrank(admin);
        
        // Create a track
        uint256 trackId = trackManager.createTrack(
            "Blockchain Basics", 
            "Learn the fundamentals of blockchain technology", 
            "ipfs://QmTrackImage"
        );
        
        // Add stages
        trackManager.addStage(
            trackId,
            "Introduction to Blockchain",
            "Basics of distributed ledger technology",
            "ipfs://QmStage1Content",
            100
        );
        
        trackManager.addStage(
            trackId,
            "Consensus Mechanisms",
            "Understanding PoW, PoS, and other consensus algorithms",
            "ipfs://QmStage2Content",
            100
        );
        
        // Verify track created
        TrackManager.Track memory track = trackManager.getTrack(trackId);
        assertEq(track.title, "Blockchain Basics");
        assertEq(track.stageCount, 2);
        
        vm.stopPrank();
    }
    
    function testEnrollment() public {
        // Create track first
        vm.startPrank(admin);
        uint256 trackId = trackManager.createTrack(
            "Blockchain Basics", 
            "Learn the fundamentals of blockchain technology", 
            "ipfs://QmTrackImage"
        );
        
        trackManager.addStage(
            trackId,
            "Introduction to Blockchain",
            "Basics of distributed ledger technology",
            "ipfs://QmStage1Content",
            100
        );
        vm.stopPrank();
        
        // Register as student
        vm.startPrank(student);
        accessControl.registerAsStudent();
        
        // Enroll in track
        enrollmentManager.enrollInTrack(trackId);
        
        // Verify enrollment
        uint256[] memory enrollments = enrollmentManager.getStudentEnrollments(student);
        assertEq(enrollments.length, 1);
        assertEq(enrollments[0], trackId);
        
        // Submit work for stage 0
        enrollmentManager.submitStageWork(
            trackId,
            0,
            "ipfs://QmSubmission1"
        );
        
        vm.stopPrank();
        
        // Mentor evaluates submission
        vm.startPrank(mentor);
        enrollmentManager.evaluateSubmission(
            student,
            trackId,
            0,
            85,
            true
        );
        vm.stopPrank();
        
        // Check progression
        EnrollmentManager.Enrollment memory enrollment = enrollmentManager.getEnrollment(student, trackId);
        assertEq(enrollment.currentStage, 1); // Should have advanced to next stage
    }
}