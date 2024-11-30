import { useQuery, useMutation, useQueryClient } from 'react-query'

import { getRequirement, getRequirementById, createRequirement, filteredRequirements, approvedRequirement, rejectedRequirement, getRequirementsByVendorId, deleteRequirementById } from '~/api/requirementApi'

// Hook để lấy danh sách yêu cầu
export const useGetRequirement = () => {
  return useQuery('requirements', getRequirement)
}

export const useGetRequirementById = (requirementId) => {
  return useQuery(['requirement', requirementId], () => getRequirementById(requirementId))
}

// Hook để tạo danh mục mới
export const useCreateRequirement = () => {
  const queryClient = useQueryClient()

  return useMutation(createRequirement, {
    onSuccess: (data) => {
      console.log('Requirement created successfully:', data)
      // Invalidate queries or perform other actions
      queryClient.invalidateQueries('Requirement')
    },
    onError: (error) => {
      console.error('Error creating Requirement:', error)
    }
  })
}

export const useFilterRequirements = (status, keyword, page, size) => {
  return useQuery(
    ['filteredRequirements', { status, keyword, page, size }],
    () => filteredRequirements({ status, keyword, page, size }),
    {
      onError: (error) => {
        console.error('Error fetching filtered categories:', error)
      }
    }
  )
}

export const useDeleteRequirement = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteRequirementById, {
    onSuccess: (data) => {
      console.log('Requirement deleted successfully:', data);
      // Invalidate queries or perform other actions
      queryClient.invalidateQueries('requirementsByVendorId');
    },
    onError: (error) => {
      console.error('Error deleting requirement:', error);
    },
  });
};

export const useRequirementsByVendorId = (vendorId) => {
  return useQuery(
    ['requirementsByVendorId', vendorId],
    () => getRequirementsByVendorId(vendorId),
    {
      onError: (error) => {
        console.error('Error fetching requirements by vendor ID:', error);
      },
    }
  );
};

export const useApprovedRequirement = () => {
  const queryClient = useQueryClient()

  return useMutation(approvedRequirement, {
    onSuccess: (data) => {
      console.log('Requirement approved successfully:', data)
      // Invalidate queries or perform other actions
      queryClient.invalidateQueries('Requirement')
    },
    onError: (error) => {
      console.error('Error approving Requirement:', error)
    }
  })
}

export const useRejectedRequirement = () => {
  const queryClient = useQueryClient()

  return useMutation((requirementId) => rejectedRequirement(requirementId), {
    onSuccess: (data) => {
      console.log('Requirement rejected successfully:', data)
      // Invalidate queries or perform other actions
      queryClient.invalidateQueries('Requirement')
    },
    onError: (error) => {
      console.error('Error rejecting Requirement:', error)
    }
  })
}