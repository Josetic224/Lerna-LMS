// hooks/useContracts.js
import { useContractRead, useContractWrite, useWaitForTransaction } from 'wagmi';
import { LernaABI, CertificateNFTABI } from '../contracts/abis';
import { contractAddresses } from '../contracts/config';

// Hook for reading user role from Lerna contract
export const useUserRole = (address) => {
  const { data, isError, isLoading } = useContractRead({
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
    isLoading,
    isError
  };
};

// Hook for registering as a student
export const useRegisterAsStudent = () => {
  const { write, data, isLoading, isError } = useContractWrite({
    address: contractAddresses.Lerna,
    abi: LernaABI,
    functionName: 'registerAsStudent',
  });

  const { isLoading: isWaiting, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return {
    registerAsStudent: () => write(),
    isLoading: isLoading || isWaiting,
    isSuccess,
    isError
  };
};

// Hook for registering as a mentor
export const useRegisterAsMentor = () => {
  const { write, data, isLoading, isError } = useContractWrite({
    address: contractAddresses.Lerna,
    abi: LernaABI,
    functionName: 'registerAsMentor',
  });

  const { isLoading: isWaiting, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return {
    registerAsMentor: () => write(),
    isLoading: isLoading || isWaiting,
    isSuccess,
    isError
  };
};

// Hook for fetching tracks
export const useTrackCount = () => {
  const { data, isError, isLoading } = useContractRead({
    address: contractAddresses.Lerna,
    abi: LernaABI,
    functionName: 'trackCount',
  });

  return {
    trackCount: data !== undefined ? Number(data) : 0,
    isLoading,
    isError
  };
};

// Hook for fetching a specific track
export const useTrack = (trackId) => {
  const { data, isError, isLoading } = useContractRead({
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
    isLoading,
    isError
  };
};

// Hook for creating a track (admin only)
export const useCreateTrack = () => {
  const { write, data, isLoading, isError } = useContractWrite({
    address: contractAddresses.Lerna,
    abi: LernaABI,
    functionName: 'createTrack',
  });

  const { isLoading: isWaiting, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return {
    createTrack: (name, description) => write({ args: [name, description] }),
    isLoading: isLoading || isWaiting,
    isSuccess,
    isError
  };
};

// Hook for submitting an assignment (student only)
export const useSubmitAssignment = () => {
  const { write, data, isLoading, isError } = useContractWrite({
    address: contractAddresses.Lerna,
    abi: LernaABI,
    functionName: 'submitAssignment',
  });

  const { isLoading: isWaiting, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return {
    submitAssignment: (trackId, stageId, ipfsHash) => 
      write({ args: [trackId, stageId, ipfsHash] }),
    isLoading: isLoading || isWaiting,
    isSuccess,
    isError
  };
};

// Hook for evaluating a submission (mentor only)
export const useEvaluateSubmission = () => {
  const { write, data, isLoading, isError } = useContractWrite({
    address: contractAddresses.Lerna,
    abi: LernaABI,
    functionName: 'evaluateSubmission',
  });

  const { isLoading: isWaiting, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return {
    evaluateSubmission: (trackId, stageId, score) => 
      write({ args: [trackId, stageId, score] }),
    isLoading: isLoading || isWaiting,
    isSuccess,
    isError
  };
};

// Hook for checking certificate ownership
export const useCertificateBalance = (address) => {
  const { data, isError, isLoading } = useContractRead({
    address: contractAddresses.CertificateNFT,
    abi: CertificateNFTABI,
    functionName: 'balanceOf',
    args: [address],
    enabled: !!address,
  });

  return {
    certificateCount: data !== undefined ? Number(data) : 0,
    isLoading,
    isError
  };
};