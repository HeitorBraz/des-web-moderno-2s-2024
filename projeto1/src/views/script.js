// Cadastro de usuário
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
  
    const response = await fetch('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    const result = await response.json();
    alert(result.message);
  });
  
  // Login de usuário
  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
  
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    const result = await response.json();
    alert(result.message);
  
    if (response.ok) {
      const dashboardResponse = await fetch('/user/dashboard');
      const dashboardData = await dashboardResponse.json();
      alert(dashboardData.message);
    }
  });
  