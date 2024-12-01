import React, { useState, useEffect } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography, Divider, IconButton, Button } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useAppStore } from '~/store/appStore'; // Đảm bảo store này có logic đúng
import { styled } from '@mui/material/styles';
import { Home, Folder, ShoppingBag, FileText, Calendar } from 'react-feather';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'; // Nhập các icon để chuyển đổi
import { useNavigate } from 'react-router-dom'; // Nhập useNavigate từ react-router-dom
import { useLogout } from '~/hooks/authHook'; // Hook logout

// Độ rộng của Drawer
const drawerWidth = 200;
const drawerCollapsedWidth = 56;

// Định nghĩa các mục
const HomeItem = { icon: <Home />, name: 'Trang Chủ', path: '/' };
const CategoryItem = {
  icon: <Folder />,
  name: 'Danh Mục',
  subItems: [
    { name: 'Danh Mục', path: '/category' },
    { name: 'Loại', path: '/category/type' }
  ]
};
const AssetItem = { icon: <ShoppingBag />, name: 'Tài Sản', subItems: [{ name: 'Danh Sách', path: '/asset' }] };
const RequirementItem = {
  icon: <FileText />,
  name: 'Yêu Cầu',
  subItems: [
    { name: 'Danh Sách', path: '/requirement' },
    { name: 'Tạo Mới', path: '/requirement/create' }
  ]
};
const SessionItem = {
  icon: <Calendar />,
  name: 'Phiên',
  subItems: [
    { name: 'Danh Sách', path: '/session' },
    { name: 'Tạo Mới', path: '/session/create' }
  ]
};

const menuItems = [HomeItem, CategoryItem, AssetItem, RequirementItem, SessionItem];

// Drawer đã được tùy chỉnh với nền trắng và văn bản đen
const StyledDrawer = styled('div')(({ open }) => ({
  width: open ? drawerWidth : drawerCollapsedWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100vh',
  borderRight: '1px solid #ccc',
  backgroundColor: '#fff',
  boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
  transition: 'width 0.4s ease',  // Hiệu ứng chuyển đổi khi mở/đóng drawer
}));

const ListItemStyled = styled(ListItem)(({ isActive, open }) => ({
  backgroundColor: isActive ? '#f0f0f0' : 'transparent',
  '&:hover': { backgroundColor: '#e0e0e0' },
  borderRadius: '8px',
  transition: 'all 0.3s ease',  // Hiệu ứng chuyển đổi trạng thái item
  padding: open ? '8px 12px' : '12px 0',
  marginBottom: '8px',
}));

const Sidenav = ({ children }) => {
  const open = useAppStore((state) => state.dopen); // Truy cập state dopen từ Zustand
  const setDopen = useAppStore((state) => state.updateOpen); // Cập nhật state dopen
  const [activeSubItem, setActiveSubItem] = useState(''); // Theo dõi sub-item đang hoạt động (kết hợp khóa)
  const [expandedItems, setExpandedItems] = useState({}); // Quản lý trạng thái mở rộng như một đối tượng
  const navigate = useNavigate();

  const { mutate: logout, isLoading: isLoggingOut } = useLogout(); // Sử dụng hook useLogout

  // Đặt trạng thái mặc định trước khi tải từ localStorage
  const [loading, setLoading] = useState(true);

  // Effect để tải trạng thái từ localStorage khi component được mount
  useEffect(() => {
    const savedExpandedItems = JSON.parse(localStorage.getItem('expandedItems')) || {};
    const savedActiveSubItem = localStorage.getItem('activeSubItem') || ''; // Lấy sub-item đang hoạt động đã lưu
    setExpandedItems(savedExpandedItems);
    setActiveSubItem(savedActiveSubItem);
    setLoading(false); // Đặt loading thành false sau khi tải hoàn tất
  }, []);

  // Hàm để cập nhật localStorage mỗi khi expandedItems hoặc activeSubItem thay đổi
  const updateLocalStorage = (newExpandedItems, newActiveSubItem) => {
    localStorage.setItem('expandedItems', JSON.stringify(newExpandedItems));
    localStorage.setItem('activeSubItem', newActiveSubItem); // Lưu trạng thái active sub-item vào localStorage
  };

  // Chuyển đổi trạng thái mở rộng của các mục cha (bao gồm cả sub-items của chúng)
  const handleItemClick = (itemId, path) => {
    const item = menuItems.find((item) => item.name === itemId);

    if (item?.subItems) {
      setExpandedItems((prevExpandedItems) => {
        const updatedExpandedItems = {
          ...prevExpandedItems,
          [itemId]: !prevExpandedItems[itemId], // Chuyển đổi trạng thái mở rộng của mục được chọn
        };
        updateLocalStorage(updatedExpandedItems, activeSubItem); // Lưu trạng thái vào localStorage
        return updatedExpandedItems;
      });
    }

    navigate(path); // Chuyển hướng đến path
  };

  const handleSubItemClick = (subItemId, path, parentItemId) => {
    // Tạo khóa duy nhất bằng cách sử dụng cả tên mục cha và tên sub-item
    const newActiveSubItem = `${parentItemId}-${subItemId}`;
    setActiveSubItem(newActiveSubItem);

    setExpandedItems((prevExpandedItems) => ({
      ...prevExpandedItems,
      [parentItemId]: true, // Giữ mục cha luôn mở rộng
    }));

    updateLocalStorage(expandedItems, newActiveSubItem); // Lưu trạng thái active sub-item vào localStorage

    navigate(path); // Chuyển hướng đến path của sub-item
  };

  const handleDrawerToggle = () => {
    setDopen(!open); // Chuyển đổi trạng thái dopen để mở/đóng drawer
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const newItems = Array.from(menuItems);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
  };

  const handleLogout = () => {
    logout();

    navigate('/'); 

  };

  if (loading) {
    return null; // Không render gì khi đang tải
  }

  return (
    <Box>
      <StyledDrawer open={open}>
        <Box sx={{ padding: '8px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {open ? (
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000' }}>
              Admin
            </Typography>
          ) : (
            <Box sx={{ width: '100%' }} />
          )}
          <IconButton onClick={handleDrawerToggle} sx={{ padding: 0, display: 'flex', justifyContent: 'center' }}>
            {open ? <FiChevronLeft /> : <FiChevronRight />} {/* Hiển thị icon tương ứng */}
          </IconButton>
        </Box>

        <Divider sx={{ marginBottom: '8px', borderColor: '#ddd' }} />

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="sidebar-items">
            {(provided) => (
              <List {...provided.droppableProps} ref={provided.innerRef} sx={{ padding: '8px 16px' }}>
                {menuItems.map((item, index) => (
                  <Draggable key={item.name} draggableId={item.name} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <ListItemStyled
                          button
                          onClick={() => handleItemClick(item.name, item.path)}
                          isActive={false} // Các mục cha không nên được đánh dấu là đang hoạt động
                          open={open}
                        >
                          <ListItemIcon sx={{ minWidth: '32px', marginRight: '4px' }}>
                            {item.icon}
                          </ListItemIcon>
                          {open && <ListItemText primary={item.name} />}
                        </ListItemStyled>

                        {open && expandedItems[item.name] && item.subItems?.map((subItem) => (
                          <ListItemStyled
                            key={subItem.name}
                            button
                            onClick={() => handleSubItemClick(subItem.name, subItem.path, item.name)} // Xử lý click vào sub-item
                            isActive={activeSubItem === `${item.name}-${subItem.name}`} // So sánh bằng khóa parentName-subItemName
                            sx={{ pl: 4 }}
                          >
                            <ListItemText primary={subItem.name} />
                          </ListItemStyled>
                        ))}
                      </div>
                    )}
                  </Draggable>
                ))}
              </List>
            )}
          </Droppable>
        </DragDropContext>

        {/* Nút Logout */}
        <Box sx={{ padding: '8px 16px', position: 'absolute', bottom: '16px', width: '100%' }}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleLogout}
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              backgroundColor: '#000', // Nền đen
              color: '#fff', // Chữ trắng
              '&:hover': {
                backgroundColor: '#333', // Nền tối hơn khi hover
              },
            }}
          >
            {isLoggingOut ? 'Đang Đăng Xuất...' : 'Đăng Xuất'}
          </Button>
        </Box>
      </StyledDrawer>

      {/* Nội dung chính sẽ dịch chuyển sang phải khi sidebar mở */}
      <Box
        sx={{
          flexGrow: 1,
          marginLeft: open ? `${drawerWidth}px` : `${drawerWidth}px`, // Bắt đầu với drawer ở độ rộng đầy đủ
          transition: 'margin-left 0.4s ease', // Hiệu ứng khi drawer chuyển đổi
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Sidenav;
