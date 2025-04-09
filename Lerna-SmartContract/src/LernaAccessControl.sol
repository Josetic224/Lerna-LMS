// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Context.sol";

/**
 * @title LernaAccessControl
 * @dev Manages role-based access control for the Lerna platform
 */
contract LernaAccessControl is Context, AccessControl {
    // Define roles as bytes32 constants
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant MENTOR_ROLE = keccak256("MENTOR_ROLE");
    bytes32 public constant STUDENT_ROLE = keccak256("STUDENT_ROLE");
    
    // Events
    event RoleGranted(address account, bytes32 role);
    event RoleRevoked(address account, bytes32 role);
    
    /**
     * @dev Constructor sets up the admin role for the deployer
     */
    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setupRole(ADMIN_ROLE, _msgSender());
    }
    
    /**
     * @dev Grants student role to an address
     * @param student Address to receive student role
     */
    function grantStudentRole(address student) external onlyRole(ADMIN_ROLE) {
        grantRole(STUDENT_ROLE, student);
        emit RoleGranted(student, STUDENT_ROLE);
    }
    
    /**
     * @dev Grants mentor role to an address
     * @param mentor Address to receive mentor role
     */
    function grantMentorRole(address mentor) external onlyRole(ADMIN_ROLE) {
        grantRole(MENTOR_ROLE, mentor);
        emit RoleGranted(mentor, MENTOR_ROLE);
    }
    
    /**
     * @dev Grants admin role to an address
     * @param admin Address to receive admin role
     */
    function grantAdminRole(address admin) external onlyRole(ADMIN_ROLE) {
        grantRole(ADMIN_ROLE, admin);
        emit RoleGranted(admin, ADMIN_ROLE);
    }
    
    /**
     * @dev Revokes a role from an address
     * @param role Role to revoke
     * @param account Address to revoke role from
     */
    function revokeRole(bytes32 role, address account) public override onlyRole(ADMIN_ROLE) {
        super.revokeRole(role, account);
        emit RoleRevoked(account, role);
    }
    
    /**
     * @dev Checks if an address has the student role
     * @param account Address to check
     * @return bool Whether the address has the student role
     */
    function isStudent(address account) external view returns (bool) {
        return hasRole(STUDENT_ROLE, account);
    }
    
    /**
     * @dev Checks if an address has the mentor role
     * @param account Address to check
     * @return bool Whether the address has the mentor role
     */
    function isMentor(address account) external view returns (bool) {
        return hasRole(MENTOR_ROLE, account);
    }
    
    /**
     * @dev Checks if an address has the admin role
     * @param account Address to check
     * @return bool Whether the address has the admin role
     */
    function isAdmin(address account) external view returns (bool) {
        return hasRole(ADMIN_ROLE, account);
    }
    
    /**
     * @dev Self-registration function for students
     * Anyone can become a student without approval
     */
    function registerAsStudent() external {
        require(!hasRole(STUDENT_ROLE, _msgSender()), "Already registered as student");
        _setupRole(STUDENT_ROLE, _msgSender());
        emit RoleGranted(_msgSender(), STUDENT_ROLE);
    }
}