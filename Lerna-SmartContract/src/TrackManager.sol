// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./LernaAccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title TrackManager
 * @dev Manages educational tracks and stages
 */
contract TrackManager {
    using Counters for Counters.Counter;
    
    LernaAccessControl private accessControl;
    Counters.Counter private trackIdCounter;
    
    // Structs
    struct Stage {
        string title;
        string description;
        string contentURI; // IPFS URI for stage content
        uint256 maxScore;
    }
    
    struct Track {
        uint256 id;
        string title;
        string description;
        string imageURI; // IPFS URI for track image
        address creator;
        uint256 stageCount;
        bool isActive;
        uint256 createdAt;
    }
    
    // Mappings
    mapping(uint256 => Track) public tracks;
    mapping(uint256 => mapping(uint256 => Stage)) public stages; // trackId => stageId => Stage
    
    // Events
    event TrackCreated(uint256 indexed trackId, string title, address creator);
    event StageAdded(uint256 indexed trackId, uint256 stageId, string title);
    event TrackUpdated(uint256 indexed trackId);
    event TrackStatusChanged(uint256 indexed trackId, bool isActive);
    
    /**
     * @dev Constructor sets the access control contract
     * @param _accessControl Address of LernaAccessControl contract
     */
    constructor(address _accessControl) {
        accessControl = LernaAccessControl(_accessControl);
    }
    
    /**
     * @dev Modifier to check if caller has admin role
     */
    modifier onlyAdmin() {
        require(accessControl.isAdmin(msg.sender), "Caller is not an admin");
        _;
    }
    
    /**
     * @dev Creates a new educational track
     * @param title Track title
     * @param description Track description
     * @param imageURI IPFS URI for track image
     * @return uint256 ID of the new track
     */
    function createTrack(
        string memory title,
        string memory description,
        string memory imageURI
    ) external onlyAdmin returns (uint256) {
        uint256 trackId = trackIdCounter.current();
        trackIdCounter.increment();
        
        tracks[trackId] = Track({
            id: trackId,
            title: title,
            description: description,
            imageURI: imageURI,
            creator: msg.sender,
            stageCount: 0,
            isActive: true,
            createdAt: block.timestamp
        });
        
        emit TrackCreated(trackId, title, msg.sender);
        return trackId;
    }
    
    /**
     * @dev Adds a stage to an existing track
     * @param trackId ID of the track
     * @param title Stage title
     * @param description Stage description
     * @param contentURI IPFS URI for stage content
     * @param maxScore Maximum score for this stage
     * @return uint256 ID of the new stage
     */
    function addStage(
        uint256 trackId,
        string memory title,
        string memory description,
        string memory contentURI,
        uint256 maxScore
    ) external onlyAdmin returns (uint256) {
        require(tracks[trackId].id == trackId, "Track does not exist");
        
        uint256 stageId = tracks[trackId].stageCount;
        
        stages[trackId][stageId] = Stage({
            title: title,
            description: description,
            contentURI: contentURI,
            maxScore: maxScore
        });
        
        tracks[trackId].stageCount++;
        
        emit StageAdded(trackId, stageId, title);
        return stageId;
    }
    
    /**
     * @dev Updates track information
     * @param trackId ID of the track to update
     * @param title New title
     * @param description New description
     * @param imageURI New image URI
     */
    function updateTrack(
        uint256 trackId,
        string memory title,
        string memory description,
        string memory imageURI
    ) external onlyAdmin {
        require(tracks[trackId].id == trackId, "Track does not exist");
        
        Track storage track = tracks[trackId];
        track.title = title;
        track.description = description;
        track.imageURI = imageURI;
        
        emit TrackUpdated(trackId);
    }
    
    /**
     * @dev Sets the active status of a track
     * @param trackId ID of the track
     * @param isActive New active status
     */
    function setTrackStatus(uint256 trackId, bool isActive) external onlyAdmin {
        require(tracks[trackId].id == trackId, "Track does not exist");
        
        tracks[trackId].isActive = isActive;
        
        emit TrackStatusChanged(trackId, isActive);
    }
    
    /**
     * @dev Gets track information
     * @param trackId ID of the track
     * @return Track struct with track information
     */
    function getTrack(uint256 trackId) external view returns (Track memory) {
        require(tracks[trackId].id == trackId, "Track does not exist");
        return tracks[trackId];
    }
    
    /**
     * @dev Gets stage information
     * @param trackId ID of the track
     * @param stageId ID of the stage
     * @return Stage struct with stage information
     */
    function getStage(uint256 trackId, uint256 stageId) external view returns (Stage memory) {
        require(tracks[trackId].id == trackId, "Track does not exist");
        require(stageId < tracks[trackId].stageCount, "Stage does not exist");
        
        return stages[trackId][stageId];
    }
    
    /**
     * @dev Gets the total number of tracks
     * @return uint256 Total number of tracks
     */
    function getTrackCount() external view returns (uint256) {
        return trackIdCounter.current();
    }
    
    /**
     * @dev Gets all active tracks
     * @return activeTrackIds Array of active track IDs
     */
    function getActiveTrackIds() external view returns (uint256[] memory) {
        uint256 totalTracks = trackIdCounter.current();
        uint256 activeCount = 0;
        
        // First, count active tracks
        for (uint256 i = 0; i < totalTracks; i++) {
            if (tracks[i].isActive) {
                activeCount++;
            }
        }
        
        // Then create and populate array
        uint256[] memory activeTrackIds = new uint256[](activeCount);
        uint256 currentIndex = 0;
        
        for (uint256 i = 0; i < totalTracks; i++) {
            if (tracks[i].isActive) {
                activeTrackIds[currentIndex] = i;
                currentIndex++;
            }
        }
        
        return activeTrackIds;
    }
}