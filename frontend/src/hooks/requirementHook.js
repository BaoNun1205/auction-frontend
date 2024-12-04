import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getRequirement, getRequirementById, createRequirement, filteredRequirements, approvedRequirement, rejectedRequirement, getRequirementsByVendorId, deleteRequirementById, updateRequirement } from '~/api/requirementApi'

// Hook để lấy danh sách yêu cầu
export const useGetRequirement = () => {
  return useQuery({
    queryKey: ['requirements'],
    queryFn: getRequirement,
  });
}

export const useGetRequirementById = (requirementId) => {
  return useQuery({
    queryKey: ['requirement', requirementId],
    queryFn: () => getRequirementById(requirementId),
  });
}

// Hook để tạo danh mục mới
export const useCreateRequirement = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createRequirement,
    onSuccess: (data) => {
      console.log('Requirement created successfully:', data)
      // Invalidate queries or perform other actions
      queryClient.invalidateQueries(['requirements'])
    },
    onError: (error) => {
      console.error('Error creating Requirement:', error)
    }
  });
}

export const useFilterRequirements = (status, keyword, page, size) => {
  return useQuery({
    queryKey: ['filteredRequirements', { status, keyword, page, size }],
    queryFn: () => filteredRequirements({ status, keyword, page, size }),
    onError: (error) => {
      console.error('Error fetching filtered categories:', error)
    }
  });
}

export const useDeleteRequirement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRequirementById,
    onSuccess: (data) => {
      console.log('Requirement deleted successfully:', data);
      // Invalidate queries or perform other actions
      queryClient.invalidateQueries(['requirementsByVendorId']);
    },
    onError: (error) => {
      console.error('Error deleting requirement:', error);
    },
  });
};

export const useRequirementsByVendorId = (vendorId) => {
  return useQuery({
    queryKey: ['requirementsByVendorId', vendorId],
    queryFn: () => getRequirementsByVendorId(vendorId),
    onError: (error) => {
      console.error('Error fetching requirements by vendor ID:', error);
    },
  });
};

export const useApprovedRequirement = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: approvedRequirement,
    onSuccess: (data) => {
      console.log('Requirement approved successfully:', data)
      // Invalidate queries or perform other actions
      queryClient.invalidateQueries(['requirements'])
    },
    onError: (error) => {
      console.error('Error approving Requirement:', error)
    }
  });
}

export const useRejectedRequirement = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (requirementId) => rejectedRequirement(requirementId),
    onSuccess: (data) => {
      console.log('Requirement rejected successfully:', data)
      // Invalidate queries or perform other actions
      queryClient.invalidateQueries(['requirements'])
    },
    onError: (error) => {
      console.error('Error rejecting Requirement:', error)
    }
  });
}

export const useupdateRequirement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ requirementId, payload }) => updateRequirement(requirementId, payload), // Call the API with addressId and payload
    onSuccess: (data) => {
      console.log('Requirement updated successfully:', data);
      // Invalidate queries to refetch the updated data
      queryClient.invalidateQueries(['requirements']);
    },
    onError: (error) => {
      console.error('Error updating requirement:', error);
    }
  });
};