import React, { useState, useEffect } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography, Divider, IconButton, Button } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useAppStore } from '~/store/appStore'; // Đảm bảo store này có logic đúng
import { styled } from '@mui/material/styles';
import { Home, Folder, ShoppingBag, FileText, Calendar } from 'react-feather';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'; // Nhập các icon để chuyển đổi
import { useNavigate } from 'react-router-dom'; // Nhập useNavigate từ react-router-dom
import { useLogout } from '~/hooks/authHook'; // Hook logout
import { LogOut } from 'react-feather';

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
const AssetItem = { icon: <ShoppingBag />, name: 'Vật phẩm', path: '/asset' };
const RequirementItem = {
  icon: <FileText />,
  name: 'Yêu Cầu',
  path: '/requirement'

};
const SessionItem = {
  icon: <Calendar />,
  name: 'Phiên',
  path: '/session',
};

const menuItems = [HomeItem, CategoryItem, AssetItem, RequirementItem, SessionItem];

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
  transition: 'width 0.4s ease',  
}));

const ListItemStyled = styled(ListItem)(({ isActive, open }) => ({
  backgroundColor: isActive ? '#f0f0f0' : 'transparent',
  '&:hover': { backgroundColor: '#e0e0e0' },
  borderRadius: '8px',
  transition: 'all 0.3s ease',  
  padding: open ? '8px 12px' : '12px 0',
  marginBottom: '8px',
}));

const Sidenav = ({ children }) => {
  const open = useAppStore((state) => state.dopen); 
  const setDopen = useAppStore((state) => state.updateOpen); 
  const [activeSubItem, setActiveSubItem] = useState(''); 
  const [expandedItems, setExpandedItems] = useState({}); 
  const navigate = useNavigate();

  const { mutate: logout, isLoading: isLoggingOut } = useLogout(); 


  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const savedExpandedItems = JSON.parse(localStorage.getItem('expandedItems')) || {};
    const savedActiveSubItem = localStorage.getItem('activeSubItem') || '';
    setExpandedItems(savedExpandedItems);
    setActiveSubItem(savedActiveSubItem);
    setLoading(false); 
  }, []);


  const updateLocalStorage = (newExpandedItems, newActiveSubItem) => {
    localStorage.setItem('expandedItems', JSON.stringify(newExpandedItems));
    localStorage.setItem('activeSubItem', newActiveSubItem); 
  };


  const handleItemClick = (itemId, path) => {
    const item = menuItems.find((item) => item.name === itemId);

    if (item?.subItems) {
      setExpandedItems((prevExpandedItems) => {
        const updatedExpandedItems = {
          ...prevExpandedItems,
          [itemId]: !prevExpandedItems[itemId], 
        };
        updateLocalStorage(updatedExpandedItems, activeSubItem); 
        return updatedExpandedItems;
      });
    }

    navigate(path); 
  };

  const handleSubItemClick = (subItemId, path, parentItemId) => {
    const newActiveSubItem = `${parentItemId}-${subItemId}`;
    setActiveSubItem(newActiveSubItem);

    setExpandedItems((prevExpandedItems) => ({
      ...prevExpandedItems,
      [parentItemId]: true, 
    }));

    updateLocalStorage(expandedItems, newActiveSubItem); 

    navigate(path); 
  };

  const handleDrawerToggle = () => {
    setDopen(!open);
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
    return null; 
  }

  return (
    <Box>
      <StyledDrawer open={open}>
        <Box sx={{ padding: '8px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {open ? (
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000' }}>
              Manager
            </Typography>
          ) : (
            <Box sx={{ width: '100%' }} />
          )}
          <IconButton onClick={handleDrawerToggle} sx={{ padding: 0, display: 'flex', justifyContent: 'center' }}>
            {open ? <FiChevronLeft /> : <FiChevronRight />} 
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
                          isActive={false}
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
        <Box
  sx={{
    padding: open ? '8px 16px' : '0', 
    position: 'absolute',
    bottom: '16px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center', // Căn giữa khi thu nhỏ
  }}
>
  <Button
    fullWidth={open}
    onClick={handleLogout}
    sx={{
      borderRadius: open ? '8px' : '50%', // Tròn khi thu nhỏ
      textTransform: 'none',
      backgroundColor: open ? '#000' : 'transparent', // Nền đen khi mở, không nền khi thu nhỏ
      color: open ? '#fff' : '#000', // Màu icon đồng nhất
      padding: open ? '8px 36px' : '12px', // Đảm bảo padding phù hợp
      minHeight: '48px', // Chiều cao phù hợp
      width: open ? 'auto' : '48px', // Độ rộng tự động hoặc vuông khi thu nhỏ
      display: 'flex',
      justifyContent: 'center', // Căn giữa nội dung
      alignItems: 'center', // Đảm bảo căn giữa theo trục dọc
      boxShadow: 'none', // Xóa khung
      transition: 'all 0.3s ease', // Hiệu ứng mượt
      '&:hover': {
        backgroundColor: open ? '#333' : '#f0f0f0', // Nền khi hover
      },
    }}
  >
    {open ? (
      'Đăng Xuất'
    ) : (
      <LogOut size={20} /> // Biểu tượng nằm giữa khi thu nhỏ
    )}
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
