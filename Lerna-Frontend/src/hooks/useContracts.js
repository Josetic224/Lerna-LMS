// hooks/useContracts.js
import { useReadContract, useWriteContract, useWatchContractEvent, useWaitForTransactionReceipt } from 'wagmi';
import { LernaABI, CertificateNFTABI } from '../contracts/abi';
import { contractAddresses } from '../contracts/config';

// Hook for reading user role from Lerna contract
export const useUserRole = (address) => {
  const { data, error, isPending } = useReadContract({
    address: contractAddresses.Lerna,
    abi: LernaABI,
    functionName: 'roles',
    args: [address],
    enabled: !!address,
  });

  // Roles enum: 0 = None, 1 = Student, 2 = Mentor, 3 = Admin
  const roleMapping = {
    0: null,
    1: 'student',
    2: 'mentor', 
    3: 'admin'
  };

  return {
    userRole: data !== undefined ? roleMapping[Number(data)] : null,
    isLoading: isPending,
    isError: !!error
  };
};

// Hook for registering as a student
export const useRegisterAsStudent = () => {
  const { data: hash, isPending, isError, writeContract } = useWriteContract();
  
  const { isLoading: isWaiting, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const registerAsStudent = () => {
    writeContract({
      address: contractAddresses.Lerna,
      abi: LernaABI,
      functionName: 'registerAsStudent',
    });
  };

  return {
    registerAsStudent,
    isLoading: isPending || isWaiting,
    isSuccess,
    isError
  };
};

// Hook for registering as a mentor
export const useRegisterAsMentor = () => {
  const { data: hash, isPending, isError, writeContract } = useWriteContract();
  
  const { isLoading: isWaiting, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const registerAsMentor = () => {
    writeContract({
      address: contractAddresses.Lerna,
      abi: LernaABI,
      functionName: 'registerAsMentor',
    });
  };

  return {
    registerAsMentor,
    isLoading: isPending || isWaiting,
    isSuccess,
    isError
  };
};

// Hook for fetching tracks
export const useTrackCount = () => {
  const { data, error, isPending } = useReadContract({
    address: contractAddresses.Lerna,
    abi: LernaABI,
    functionName: 'trackCount',
  });

  return {
    trackCount: data !== undefined ? Number(data) : 0,
    isLoading: isPending,
    isError: !!error
  };
};

// Hook for fetching a specific track
export const useTrack = (trackId) => {
  const { data, error, isPending } = useReadContract({
    address: contractAddresses.Lerna,
    abi: LernaABI,
    functionName: 'tracks',
    args: [trackId],
    enabled: trackId !== undefined && trackId > 0,
  });

  const track = data ? {
    id: Number(data[0]),
    name: data[1],
    description: data[2],
    stageCount: Number(data[3])
  } : null;

  return {
    track,
    isLoading: isPending,
    isError: !!error
  };
};

// Hook for creating a track (admin only)
export const useCreateTrack = () => {
  const { data: hash, isPending, isError, writeContract } = useWriteContract();
  
  const { isLoading: isWaiting, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const createTrack = (name, description) => {
    writeContract({
      address: contractAddresses.Lerna,
      abi: LernaABI,
      functionName: 'createTrack',
      args: [name, description]
    });
  };

  return {
    createTrack,
    isLoading: isPending || isWaiting,
    isSuccess,
    isError
  };
};

// Hook for submitting an assignment (student only)
export const useSubmitAssignment = () => {
  const { data: hash, isPending, isError, writeContract } = useWriteContract();
  
  const { isLoading: isWaiting, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const submitAssignment = (trackId, stageId, ipfsHash) => {
    writeContract({
      address: contractAddresses.Lerna,
      abi: LernaABI,
      functionName: 'submitAssignment',
      args: [trackId, stageId, ipfsHash]
    });
  };

  return {
    submitAssignment,
    isLoading: isPending || isWaiting,
    isSuccess,
    isError
  };
};

// Hook for evaluating a submission (mentor only)
export const useEvaluateSubmission = () => {
  const { data: hash, isPending, isError, writeContract } = useWriteContract();
  
  const { isLoading: isWaiting, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const evaluateSubmission = (trackId, stageId, score) => {
    writeContract({
      address: contractAddresses.Lerna,
      abi: LernaABI,
      functionName: 'evaluateSubmission',
      args: [trackId, stageId, score]
    });
  };

  return {
    evaluateSubmission,
    isLoading: isPending || isWaiting,
    isSuccess,
    isError
  };
};

// Hook for checking certificate ownership
export const useCertificateBalance = (address) => {
  const { data, error, isPending } = useReadContract({
    address: contractAddresses.CertificateNFT,
    abi: CertificateNFTABI,
    functionName: 'balanceOf',
    args: [address],
    enabled: !!address,
  });

  return {
    certificateCount: data !== undefined ? Number(data) : 0,
    isLoading: isPending,
    isError: !!error
  };
};