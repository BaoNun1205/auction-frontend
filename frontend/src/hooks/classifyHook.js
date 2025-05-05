import { useMutation } from '@tanstack/react-query'
import { classifyProduct } from '~/api/classifyApi'

export const useClassifyProduct = () => {
  return useMutation({
    mutationFn: classifyProduct,
    onSuccess: (data) => {
    },
    onError: (error) => {
      console.error('Lỗi khi phân loại sản phẩm:', error)
    }
  })
}
