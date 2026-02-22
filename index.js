const products = [
            {
                id: 1,
                title: "Wireless Headphones",
                price: 79.99,
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
                description: "Premium wireless headphones with active noise cancellation and 30-hour battery life. Experience superior sound quality.",
                rating: 4.5,
                category: "Electronics"
            },
            {
                id: 2,
                title: "Smart Watch",
                price: 199.99,
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
                description: "Advanced fitness tracking smartwatch with heart rate monitor, GPS, and waterproof design.",
                rating: 4.7,
                category: "Electronics"
            },
            {
                id: 3,
                title: "Laptop Backpack",
                price: 49.99,
                image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
                description: "Durable laptop backpack with multiple compartments, USB charging port, and water-resistant material.",
                rating: 4.3,
                category: "Accessories"
            },
            {
                id: 4,
                title: "Coffee Maker",
                price: 89.99,
                image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&h=500&fit=crop",
                description: "Programmable coffee maker with thermal carafe, brew strength control, and auto-shutoff feature.",
                rating: 4.6,
                category: "Home"
            },
            {
                id: 5,
                title: "Running Shoes",
                price: 119.99,
                image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
                description: "Lightweight running shoes with responsive cushioning and breathable mesh upper for maximum comfort.",
                rating: 4.8,
                category: "Sports"
            },
            {
                id: 6,
                title: "Sunglasses",
                price: 59.99,
                image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop",
                description: "Polarized sunglasses with UV protection and stylish design. Perfect for outdoor activities.",
                rating: 4.4,
                category: "Accessories"
            },
            {
                id: 7,
                title: "Yoga Mat",
                price: 34.99,
                image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop",
                description: "Non-slip yoga mat with extra cushioning and carrying strap. Eco-friendly and durable.",
                rating: 4.5,
                category: "Sports"
            },
            {
                id: 8,
                title: "Desk Lamp",
                price: 39.99,
                image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop",
                description: "LED desk lamp with adjustable brightness, touch control, and USB charging port.",
                rating: 4.6,
                category: "Home"
            },
            {
                id: 9,
                title: "Water Bottle",
                price: 24.99,
                image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop",
                description: "Insulated stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours.",
                rating: 4.7,
                category: "Sports"
            },
            {
                id: 10,
                title: "Bluetooth Speaker",
                price: 69.99,
                image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop",
                description: "Portable Bluetooth speaker with 360-degree sound, waterproof design, and 12-hour battery.",
                rating: 4.5,
                category: "Electronics"
            },
            {
                id: 11,
                title: "Camera Tripod",
                price: 44.99,
                image: "https://images.unsplash.com/photo-1606914469120-fe23a61dc7db?w=500&h=500&fit=crop",
                description: "Adjustable camera tripod with smartphone mount, remote control, and carrying case.",
                rating: 4.3,
                category: "Electronics"
            },
            {
                id: 12,
                title: "Notebook Set",
                price: 19.99,
                image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=500&h=500&fit=crop",
                description: "Premium notebook set with hardcover, dotted pages, and elastic closure. Perfect for journaling.",
                rating: 4.4,
                category: "Stationery"
            }
        ];

        // ==================== STATE MANAGEMENT ====================
        
        let currentUser = null;
        let cart = [];
        let filteredProducts = [...products];

        // ==================== INITIALIZATION ====================
        
        function init() {
            loadUserSession();
            loadCart();
            updateCartCount();
            updateAuthUI();
            handleRouting();
            setupEventListeners();
            window.addEventListener('hashchange', handleRouting);
        }

        // ==================== EVENT LISTENERS ====================
        
        function setupEventListeners() {
            // Mobile menu toggle
            document.getElementById('mobile-menu-btn').addEventListener('click', () => {
                document.getElementById('mobile-menu').classList.toggle('hidden');
            });

            // Search functionality
            document.getElementById('search-input').addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                filteredProducts = products.filter(product => 
                    product.title.toLowerCase().includes(searchTerm) ||
                    product.description.toLowerCase().includes(searchTerm) ||
                    product.category.toLowerCase().includes(searchTerm)
                );
                renderProducts();
            });
        }

        // ==================== ROUTING ====================
        
        function handleRouting() {
            const hash = window.location.hash || '#home';
            const page = hash.split('?')[0].substring(1) || 'home';
            
            // Hide all pages
            document.querySelectorAll('.page-section').forEach(section => {
                section.classList.remove('active');
            });

            // Show current page
            const currentPage = document.getElementById(`${page}-page`);
            if (currentPage) {
                currentPage.classList.add('active');
                
                // Load page-specific content
                switch(page) {
                    case 'home':
                        renderFeaturedProducts();
                        break;
                    case 'shop':
                        renderProducts();
                        break;
                    case 'product':
                        renderProductDetails();
                        break;
                    case 'cart':
                        renderCart();
                        break;
                }
            }

            // Close mobile menu
            document.getElementById('mobile-menu').classList.add('hidden');
        }

        // ==================== AUTHENTICATION ====================
        
        function handleRegister(event) {
            event.preventDefault();
            
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;

            // Validation
            if (!name || !email || !password || !confirmPassword) {
                showAlert('Please fill in all fields', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showAlert('Please enter a valid email address', 'error');
                return;
            }

            if (password.length < 6) {
                showAlert('Password must be at least 6 characters', 'error');
                return;
            }

            if (password !== confirmPassword) {
                showAlert('Passwords do not match', 'error');
                return;
            }

            // Check if user already exists
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            if (users.find(u => u.email === email)) {
                showAlert('Email already registered', 'error');
                return;
            }

            // Save user
            const newUser = { name, email, password };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            showAlert('Registration successful! Please login.', 'success');
            document.getElementById('register-form').reset();
            
            setTimeout(() => {
                window.location.hash = '#login';
            }, 1500);
        }

        function handleLogin(event) {
            event.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            if (!email || !password) {
                showAlert('Please fill in all fields', 'error');
                return;
            }

            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === email && u.password === password);

            if (!user) {
                showAlert('Invalid email or password', 'error');
                return;
            }

            // Save session
            currentUser = { name: user.name, email: user.email };
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            showAlert(`Welcome back, ${user.name}!`, 'success');
            updateAuthUI();
            document.getElementById('login-form').reset();
            
            setTimeout(() => {
                window.location.hash = '#home';
            }, 1000);
        }

        function logout() {
            currentUser = null;
            localStorage.removeItem('currentUser');
            updateAuthUI();
            showAlert('Logged out successfully', 'success');
            window.location.hash = '#home';
        }

        function loadUserSession() {
            const savedUser = localStorage.getItem('currentUser');
            if (savedUser) {
                currentUser = JSON.parse(savedUser);
            }
        }

        function updateAuthUI() {
            const authButtons = document.getElementById('auth-buttons');
            const userMenu = document.getElementById('user-menu');
            const userName = document.getElementById('user-name');

            if (currentUser) {
                authButtons.classList.add('hidden');
                userMenu.classList.remove('hidden');
                userMenu.classList.add('flex');
                userName.textContent = currentUser.name;
            } else {
                authButtons.classList.remove('hidden');
                userMenu.classList.add('hidden');
                userMenu.classList.remove('flex');
            }
        }

        function isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        // ==================== CART MANAGEMENT ====================
        
        function loadCart() {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                cart = JSON.parse(savedCart);
            }
        }

        function saveCart() {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
        }

        function addToCart(productId, quantity = 1) {
            const product = products.find(p => p.id === productId);
            if (!product) return;

            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({ ...product, quantity });
            }

            saveCart();
            showAlert(`${product.title} added to cart!`, 'success');
        }

        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            saveCart();
            renderCart();
            showAlert('Item removed from cart', 'success');
        }

        function updateCartItemQuantity(productId, quantity) {
            const item = cart.find(item => item.id === productId);
            if (item) {
                if (quantity <= 0) {
                    removeFromCart(productId);
                } else {
                    item.quantity = quantity;
                    saveCart();
                    renderCart();
                }
            }
        }

        function clearCart() {
            if (cart.length === 0) {
                showAlert('Cart is already empty', 'error');
                return;
            }

            if (confirm('Are you sure you want to clear your cart?')) {
                cart = [];
                saveCart();
                renderCart();
                showAlert('Cart cleared', 'success');
            }
        }

        function updateCartCount() {
            const count = cart.reduce((sum, item) => sum + item.quantity, 0);
            document.getElementById('cart-count').textContent = count;
        }

        function checkout() {
            if (cart.length === 0) {
                showAlert('Your cart is empty', 'error');
                return;
            }

            if (!currentUser) {
                showAlert('Please login to checkout', 'error');
                setTimeout(() => {
                    window.location.hash = '#login';
                }, 1500);
                return;
            }

            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            alert(`Order placed successfully!\n\nTotal: $${total.toFixed(2)}\n\nThank you for your purchase, ${currentUser.name}!`);
            
            cart = [];
            saveCart();
            renderCart();
            window.location.hash = '#home';
        }

        // ==================== RENDERING ====================
        
        function renderFeaturedProducts() {
            const container = document.getElementById('featured-products');
            const featured = products.slice(0, 4);
            
            container.innerHTML = featured.map(product => createProductCard(product)).join('');
        }

        function renderProducts() {
            const container = document.getElementById('products-grid');
            const noProducts = document.getElementById('no-products');
            
            if (filteredProducts.length === 0) {
                container.innerHTML = '';
                noProducts.classList.remove('hidden');
            } else {
                noProducts.classList.add('hidden');
                container.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
            }
        }

        function createProductCard(product) {
            const stars = generateStars(product.rating);
            
            return `
                <div class="product-card bg-white rounded-lg shadow overflow-hidden">
                    <img src="${product.image}" alt="${product.title}" class="w-full h-48 object-cover">
                    <div class="p-4">
                        <h3 class="text-lg font-semibold mb-2 truncate">${product.title}</h3>
                        <div class="flex items-center mb-2">
                            <div class="star-rating mr-2">${stars}</div>
                            <span class="text-sm text-gray-600">${product.rating}</span>
                        </div>
                        <p class="text-2xl font-bold text-purple-600 mb-4">$${product.price.toFixed(2)}</p>
                        <div class="space-y-2">
                            <a href="#product?id=${product.id}" class="block w-full text-center bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition">View Details</a>
                            <button onclick="addToCart(${product.id})" class="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `;
        }

        function renderProductDetails() {
            const params = new URLSearchParams(window.location.hash.split('?')[1]);
            const productId = parseInt(params.get('id'));
            const product = products.find(p => p.id === productId);
            
            const container = document.getElementById('product-details');
            
            if (!product) {
                container.innerHTML = `
                    <div class="text-center py-12">
                        <p class="text-gray-500 text-lg mb-4">Product not found</p>
                        <a href="#shop" class="text-purple-600 hover:text-purple-700">Back to Shop</a>
                    </div>
                `;
                return;
            }

            const stars = generateStars(product.rating);
            
            container.innerHTML = `
                <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                        <div>
                            <img src="${product.image}" alt="${product.title}" class="w-full rounded-lg">
                        </div>
                        <div>
                            <a href="#shop" class="text-purple-600 hover:text-purple-700 mb-4 inline-block">&larr; Back to Shop</a>
                            <h1 class="text-3xl font-bold mb-4">${product.title}</h1>
                            <div class="flex items-center mb-4">
                                <div class="star-rating mr-2">${stars}</div>
                                <span class="text-gray-600">${product.rating} / 5</span>
                            </div>
                            <p class="text-4xl font-bold text-purple-600 mb-6">$${product.price.toFixed(2)}</p>
                            <p class="text-gray-700 mb-6">${product.description}</p>
                            <div class="mb-6">
                                <label class="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                                <input type="number" id="product-quantity" value="1" min="1" max="10" class="w-24 px-4 py-2 border border-gray-300 rounded-lg">
                            </div>
                            <button onclick="addProductToCart(${product.id})" class="w-full bg-purple-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `;
        }

        function addProductToCart(productId) {
            const quantity = parseInt(document.getElementById('product-quantity').value) || 1;
            addToCart(productId, quantity);
        }

        function renderCart() {
            const cartItemsContainer = document.getElementById('cart-items');
            const emptyCart = document.getElementById('empty-cart');
            const cartSummary = document.getElementById('cart-summary');
            
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '';
                emptyCart.classList.remove('hidden');
                cartSummary.classList.add('hidden');
            } else {
                emptyCart.classList.add('hidden');
                cartSummary.classList.remove('hidden');
                
                cartItemsContainer.innerHTML = cart.map(item => `
                    <div class="bg-white rounded-lg shadow p-4">
                        <div class="flex items-center gap-4">
                            <img src="${item.image}" alt="${item.title}" class="w-24 h-24 object-cover rounded">
                            <div class="flex-1">
                                <h3 class="text-lg font-semibold mb-1">${item.title}</h3>
                                <p class="text-purple-600 font-bold">$${item.price.toFixed(2)}</p>
                            </div>
                            <div class="flex items-center gap-2">
                                <input type="number" value="${item.quantity}" min="1" max="10" 
                                    onchange="updateCartItemQuantity(${item.id}, parseInt(this.value))"
                                    class="w-16 px-2 py-1 border border-gray-300 rounded">
                            </div>
                            <div class="text-right">
                                <p class="font-bold mb-2">$${(item.price * item.quantity).toFixed(2)}</p>
                                <button onclick="removeFromCart(${item.id})" class="text-red-500 hover:text-red-700">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('');

                // Update totals
                const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
                document.getElementById('total').textContent = `$${subtotal.toFixed(2)}`;
            }
        }

        // ==================== UTILITIES ====================
        
        function generateStars(rating) {
            const fullStars = Math.floor(rating);
            const hasHalfStar = rating % 1 >= 0.5;
            let stars = '';
            
            for (let i = 0; i < fullStars; i++) {
                stars += '★';
            }
            if (hasHalfStar) {
                stars += '☆';
            }
            
            return stars;
        }

        function showAlert(message, type = 'success') {
            const alertContainer = document.getElementById('alert-container');
            const alertDiv = document.createElement('div');
            
            const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
            
            alertDiv.className = `${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in`;
            alertDiv.innerHTML = `
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>${message}</span>
            `;
            
            alertContainer.appendChild(alertDiv);
            
            setTimeout(() => {
                alertDiv.remove();
            }, 3000);
        }

        // Initialize app when DOM is loaded
        document.addEventListener('DOMContentLoaded', init);