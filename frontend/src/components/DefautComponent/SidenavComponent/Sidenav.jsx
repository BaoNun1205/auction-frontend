import React, { useState, useEffect } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography, Divider, IconButton } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useAppStore } from '~/store/appStore';
import { styled } from '@mui/material/styles';
import { Home, Folder, ShoppingBag, FileText, Calendar } from 'react-feather';
import { FiChevronLeft, FiChevronRight, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '~/hooks/authHook';  // Import useLogout hook

const drawerWidth = 200;
const drawerCollapsedWidth = 56;

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

const menuItems = [
  HomeItem,
  CategoryItem,
  AssetItem,
  RequirementItem,
  SessionItem,
  { icon: <FiLogOut />, name: 'Đăng Xuất', path: null },  // Thêm mục Đăng xuất vào menu
];

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
  display: 'flex',
  flexDirection: 'column',
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
  
  const { mutate: logout, isLoading: isLoggingOut } = useLogout(); // useLogout hook

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedExpandedItems = JSON.parse(localStorage.getItem('expandedItems')) || {};
    const savedActiveSubItem = localStorage.getItem('activeSubItem') || '';
    setExpandedItems(savedExpandedItems);
    setActiveSubItem(savedActiveSubItem);
    setLoading(false);
  }, []);

  const handleLogout = () => {
    logout(null, {  // Gọi mutate() từ useLogout
      onSuccess: () => {
        // Đóng menu nếu có
        handleMenuClose();  
        navigate('/'); // Điều hướng về trang login sau khi đăng xuất
      },
      onError: (error) => {
        console.error('Error logging out:', error);  // Log lỗi nếu có
      }
    });
  };

  const handleMenuClose = () => {
    setDopen(false);  // Đóng drawer nếu menu đang mở
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

    if (path) {
      navigate(path); // Điều hướng nếu có path
    }
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

  if (loading) {
    return null;  // Không render gì khi đang tải
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
          <IconButton onClick={() => setDopen(!open)} sx={{ padding: 0 }}>
            {open ? <FiChevronLeft /> : <FiChevronRight />}
          </IconButton>
        </Box>

        <Divider sx={{ marginBottom: '8px', borderColor: '#ddd' }} />

        <DragDropContext onDragEnd={() => {}}>
          <Droppable droppableId="sidebar-items">
            {(provided) => (
              <List {...provided.droppableProps} ref={provided.innerRef} sx={{ padding: '8px 16px', flexGrow: 1 }}>
                {menuItems.map((item, index) => (
                  <Draggable key={item.name} draggableId={item.name} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <ListItemStyled
                          button
                          onClick={() => item.path ? handleItemClick(item.name, item.path) : handleLogout()}
                          isActive={false}
                          open={open}
                        >
                          <ListItemIcon sx={{ minWidth: '32px' }}>
                            {item.icon}
                          </ListItemIcon>
                          {open && <ListItemText primary={item.name} />}
                        </ListItemStyled>

                        {open && expandedItems[item.name] && item.subItems?.map((subItem) => (
                          <ListItemStyled
                            key={subItem.name}
                            button
                            onClick={() => handleSubItemClick(subItem.name, subItem.path, item.name)}
                            isActive={activeSubItem === `${item.name}-${subItem.name}`}
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
      </StyledDrawer>

      <Box
        sx={{
          flexGrow: 1,
          marginLeft: open ? `${drawerWidth}px` : `${drawerWidth}px`,
          transition: 'margin-left 0.4s ease',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Sidenav;
