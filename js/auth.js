document.addEventListener('DOMContentLoaded', () => {
  // Kiểm tra đăng nhập
  function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const isAdmin = localStorage.getItem('isAdmin');
    
    // Chuyển hướng nếu cần
    if (window.location.pathname.includes('admin-dashboard.html') && (!isLoggedIn || isAdmin !== 'true')) {
      window.location.href = 'login.html';
      return;
    }
    
    // Cập nhật UI dựa trên trạng thái đăng nhập
    updateUI(isLoggedIn === 'true', isAdmin === 'true');
  }
  
  // Cập nhật giao diện dựa trên trạng thái đăng nhập
  function updateUI(isLoggedIn, isAdmin) {
    const loginLink = document.getElementById('loginLink');
    const registerLink = document.getElementById('registerLink');
    const logoutLink = document.getElementById('logoutLink');
    const adminDashboardLink = document.getElementById('adminDashboardLink');
    
    if (loginLink) {
      if (isLoggedIn) {
        loginLink.textContent = 'Tài khoản';
        loginLink.href = isAdmin ? 'admin-dashboard.html' : 'user-account.html';
      } else {
        loginLink.textContent = 'Đăng nhập';
        loginLink.href = 'login.html';
      }
    }
    
    if (registerLink) {
      registerLink.style.display = isLoggedIn ? 'none' : 'block';
    }
    
    if (logoutLink) {
      logoutLink.style.display = isLoggedIn ? 'block' : 'none';
    }
    
    if (adminDashboardLink) {
      adminDashboardLink.style.display = (isLoggedIn && isAdmin) ? 'block' : 'none';
    }
  }
  
  // Xử lý form đăng nhập
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      // Lấy danh sách người dùng từ localStorage
      const users = JSON.parse(localStorage.getItem('users')) || [];
      
      // Kiểm tra thông tin đăng nhập
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        // Lưu thông tin đăng nhập
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('isAdmin', user.isAdmin.toString());
        localStorage.setItem('currentUser', JSON.stringify({
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin
        }));
        
        // Chuyển hướng người dùng
        if (user.isAdmin) {
          window.location.href = 'admin-dashboard.html';
        } else {
          window.location.href = 'index.html';
        }
      } else {
        alert('Email hoặc mật khẩu không đúng!');
      }
    });
  }
  
  // Xử lý form đăng ký
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      // Lấy danh sách người dùng từ localStorage
      let users = JSON.parse(localStorage.getItem('users')) || [];
      
      // Kiểm tra email đã tồn tại chưa
      if (users.some(u => u.email === email)) {
        alert('Email đã được sử dụng!');
        return;
      }
      
      // Thêm người dùng mới
      users.push({
        email,
        password,
        name,
        isAdmin: false
      });
      
      // Lưu danh sách người dùng
      localStorage.setItem('users', JSON.stringify(users));
      
      alert('Đăng ký thành công! Vui lòng đăng nhập.');
      window.location.href = 'login.html';
    });
  }
  
  // Xử lý đăng xuất
  const logoutLink = document.getElementById('logoutLink');
  if (logoutLink) {
    logoutLink.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Xóa thông tin đăng nhập
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('currentUser');
      
      // Chuyển hướng về trang chủ
      window.location.href = 'index.html';
    });
  }
  
  // Kiểm tra trạng thái đăng nhập khi tải trang
  checkLoginStatus();
});