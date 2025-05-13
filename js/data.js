// Khởi tạo dữ liệu khi trang tải lần đầu
window.initializeData = function() {
  // Khởi tạo sản phẩm mặc định nếu chưa có
  if (!localStorage.getItem('products')) {
    const defaultProducts = [
    {
      id: 1,
      name: 'Sony 1',
      price: 129.99,
      description: 'Beautiful',
      image: '/images/product-1.jpg',
      featured: true
    },
    {
      id: 2,
      name: 'Sony 2',
      price: 59.99,
      description: 'Đẹp',
      image: '/images/product-2.jpg',
      featured: true
    },
    {
      id: 3,
      name: 'Sony 3',
      price: 89.99,
      description: 'High-quality',
      image: '/images/product-3.jpg',
      featured: true
    },
    {
      id: 4,
      name: 'sony 4',
      price: 45.99,
      description: 'Low',
      image: 'https://www.bhphotovideo.com/images/images2500x2500/sony_dsc_w710_cyber_shot_w710_digital_camera_910811.jpg',
      featured: false
    },
    {
      id: 5,
      name: 'Sony 5',
      price: 199.99,
      description: 'Ex',
      image: 'https://tse1.mm.bing.net/th/id/OIP.aFtlGCgWAttEZAQhydHrBAHaGe?rs=1&pid=ImgDetMain',
      featured: false
    }
  ];
    localStorage.setItem('products', JSON.stringify(defaultProducts));
  }

  // Khởi tạo tài khoản người dùng mặc định
  if (!localStorage.getItem('users')) {
    const defaultUsers = [
      { email: 'admin@example.com', password: 'admin123', name: 'Người quản trị', isAdmin: true },
      { email: 'user@example.com', password: 'user123', name: 'Người dùng', isAdmin: false }
    ];
    localStorage.setItem('users', JSON.stringify(defaultUsers));
  }
};

// Gọi hàm khởi tạo khi trang tải
document.addEventListener('DOMContentLoaded', window.initializeData);