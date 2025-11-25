import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { drivesService } from '@/services';
import { Drive, PaginationParams } from '@/services/types';

// Query keys
export const driveKeys = {
  all: ['drives'] as const,
  lists: () => [...driveKeys.all, 'list'] as const,
  list: (filters: any) => [...driveKeys.lists(), filters] as const,
  details: () => [...driveKeys.all, 'detail'] as const,
  detail: (id: string) => [...driveKeys.details(), id] as const,
  applications: (id: string) => [...driveKeys.detail(id), 'applications'] as const,
  stats: (id: string) => [...driveKeys.detail(id), 'stats'] as const,
  upcoming: () => [...driveKeys.all, 'upcoming'] as const,
  company: (companyId: string) => [...driveKeys.all, 'company', companyId] as const,
};

// Drives list hooks
export const useDrives = (params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  type?: string;
  location?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}) => {
  return useQuery({
    queryKey: driveKeys.list(params || {}),
    queryFn: () => drivesService.getDrives(params),
    select: (response) => response.data,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useDriveById = (driveId: string) => {
  return useQuery({
    queryKey: driveKeys.detail(driveId),
    queryFn: () => drivesService.getDriveById(driveId),
    select: (response) => response.data,
    enabled: !!driveId,
  });
};

// Drive management hooks
export const useCreateDrive = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (driveData: Omit<Drive, 'id' | 'createdAt' | 'updatedAt' | 'applicantsCount' | 'selectedCount'>) =>
      drivesService.createDrive(driveData),
    onSuccess: () => {
      // Invalidate drives list
      queryClient.invalidateQueries({ queryKey: driveKeys.lists() });
    },
    onError: (error: any) => {
      console.error('Failed to create drive:', error);
    },
  });
};

export const useUpdateDrive = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ driveId, driveData }: { driveId: string; driveData: Partial<Drive> }) =>
      drivesService.updateDrive(driveId, driveData),
    onSuccess: (response, variables) => {
      // Invalidate specific drive and drives list
      queryClient.invalidateQueries({ queryKey: driveKeys.detail(variables.driveId) });
      queryClient.invalidateQueries({ queryKey: driveKeys.lists() });
    },
    onError: (error: any) => {
      console.error('Failed to update drive:', error);
    },
  });
};

export const useDeleteDrive = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (driveId: string) => drivesService.deleteDrive(driveId),
    onSuccess: (response, driveId) => {
      // Remove drive from cache and invalidate list
      queryClient.removeQueries({ queryKey: driveKeys.detail(driveId) });
      queryClient.invalidateQueries({ queryKey: driveKeys.lists() });
    },
    onError: (error: any) => {
      console.error('Failed to delete drive:', error);
    },
  });
};

// Drive applications hooks
export const useDriveApplications = (driveId: string, params?: PaginationParams) => {
  return useQuery({
    queryKey: driveKeys.applications(driveId),
    queryFn: () => drivesService.getDriveApplications(driveId, params),
    select: (response) => response.data,
    enabled: !!driveId,
  });
};

export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ 
      applicationId, 
      status, 
      notes 
    }: { 
      applicationId: string; 
      status: string; 
      notes?: string 
    }) => drivesService.updateApplicationStatus(applicationId, status as any, notes),
    onSuccess: (response, variables) => {
      // Invalidate applications queries
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      queryClient.invalidateQueries({ queryKey: driveKeys.applications('all') });
    },
    onError: (error: any) => {
      console.error('Failed to update application status:', error);
    },
  });
};

// Drive statistics hooks
export const useDriveStats = (driveId: string) => {
  return useQuery({
    queryKey: driveKeys.stats(driveId),
    queryFn: () => drivesService.getDriveStats(driveId),
    select: (response) => response.data,
    enabled: !!driveId,
    staleTime: 5 * 60 * 1000, // 5 minutes for stats
  });
};

// Upcoming drives hooks
export const useUpcomingDrives = (limit: number = 5, collegeId?: string) => {
  return useQuery({
    queryKey: driveKeys.upcoming(),
    queryFn: () => drivesService.getUpcomingDrives(limit), // TODO: Add collegeId when service supports filtering
    select: (response) => response.data,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Company drives hooks
export const useDrivesByCompany = (companyId: string) => {
  return useQuery({
    queryKey: driveKeys.company(companyId),
    queryFn: () => drivesService.getDrivesByCompany(companyId),
    select: (response) => response.data,
    enabled: !!companyId,
  });
};

// Drive management hooks
export const useCloseDrive = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (driveId: string) => drivesService.closeDrive(driveId),
    onSuccess: (response, driveId) => {
      // Invalidate specific drive and drives list
      queryClient.invalidateQueries({ queryKey: driveKeys.detail(driveId) });
      queryClient.invalidateQueries({ queryKey: driveKeys.lists() });
    },
    onError: (error: any) => {
      console.error('Failed to close drive:', error);
    },
  });
};

export const useDuplicateDrive = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ driveId, newTitle }: { driveId: string; newTitle: string }) =>
      drivesService.duplicateDrive(driveId, newTitle),
    onSuccess: () => {
      // Invalidate drives list
      queryClient.invalidateQueries({ queryKey: driveKeys.lists() });
    },
    onError: (error: any) => {
      console.error('Failed to duplicate drive:', error);
    },
  });
};
