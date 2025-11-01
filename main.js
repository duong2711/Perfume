(function() {
  // Đảm bảo thay thế bằng PUBLIC KEY của bạn
  emailjs.init("W9rFfW9hW_748etKm"); 
})();

// Default configuration
const defaultConfig = {
store_name: "Tạp hóa sinh viên",
tagline: "Khám phá hương thơm của riêng bạn",
hero_title: "Nước hoa cao cấp cho mọi khoảnh khắc",
hero_subtitle: "Thưởng thức bộ sưu tập nước hoa cao cấp được tuyển chọn kỹ lưỡng từ những thương hiệu danh tiếng nhất thế giới.",
cta_button: "Mua ngay",
phone_number: "0123 456 789",
email_address: "contact@taphoasinhvien.com",
address: "123 Đường ABC, Quận 1, TP.HCM",
background_color: "#ffffff",
surface_color: "#f9fafb",
text_color: "#374151",
primary_action_color: "#374151",
secondary_action_color: "#6b7280",
font_family: "Inter",
font_size: 16
};

// *** DATA: Dữ liệu sản phẩm (Dễ dàng chỉnh sửa và thêm mới) ***
const productsData = [
  {
    name: "Hoa hồng thanh lịch",
    price: 2200000,
    category: "nu",
    desc: "Sự pha trộn lãng mạn giữa hoa hồng Bulgaria và xạ hương trắng, tạo nên hương thơm quyến rũ và tinh tế.",
    image: "assets/images/perfume-rose.png",
    tag: "Mới",
    color: "rose"
  },
  {
    name: "Gió biển",
    price: 1850000,
    category: "nam",
    desc: "Hương nước tươi mát với chút muối biển, mang lại cảm giác tự do và năng động cho phái mạnh.",
    image: "assets/images/perfume-ocean.png",
    tag: "Nam",
    color: "blue"
  },
  {
    name: "Hoàng hôn vàng",
    price: 3100000,
    category: "unisex",
    desc: "Hương vani ấm áp và gỗ đàn hương với nốt hương cam chanh, phù hợp cho cả nam và nữ.",
    image: "assets/images/perfume-amber.png",
    tag: "Giới hạn",
    color: "amber"
  },
  {
    name: "Rừng xanh",
    price: 1950000,
    category: "nu",
    desc: "Hương thơm tươi mát của lá cây và hoa nhài, mang lại cảm giác gần gũi với thiên nhiên.",
    image: "assets/images/perfume-green.png",
    tag: "Nữ",
    color: "green"
  },
  {
    name: "Đêm sâu thẳm",
    price: 2750000,
    category: "nam",
    desc: "Hương thơm mạnh mẽ với gỗ cedar và hổ phách, thể hiện sự nam tính và bí ẩn.",
    image: "assets/images/perfume-deep.png",
    tag: "Nam",
    color: "indigo"
  },
  {
    name: "Tím lavender",
    price: 1650000,
    category: "unisex",
    desc: "Hương lavender thư giãn kết hợp với bergamot tươi mát, mang lại cảm giác bình yên.",
    image: "assets/images/perfume-lavender.png",
    tag: "Bán chạy",
    color: "purple"
  }
];

// Shopping cart
let cart = [];
let cartTotal = 0;

// Mobile menu toggle (Sửa lỗi logic)
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  mobileMenu.classList.toggle('hidden');
}

// *** LOGIC RENDERING VÀ LỌC SẢN PHẨM ***
// Hiện / Ẩn form Checkout
function toggleCheckoutModal() {
  document.getElementById('checkout-modal').classList.toggle('hidden');
}

// ⭐ HÀM NÀY ĐÃ SỬA: Chỉ checkout các món đã chọn
function handleCheckout2() {
    const selectedItems = cart.filter(item => item.selected); // Lấy món đã chọn
    if (selectedItems.length === 0) {
        alert('Bạn chưa chọn món hàng nào để thanh toán!');
        return;
    }
    checkout(selectedItems); // Gửi các món đã chọn đi
}

// ⭐ HÀM NÀY ĐÃ SỬA: Nhận itemsToCheckout, lưu lịch sử cho Guest
function checkout(itemsToCheckout) {
  const checkoutModal = document.createElement('div');
  checkoutModal.className = 'fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50';
  checkoutModal.innerHTML = `
    <div class="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full relative animate-fadeIn">
      <button onclick="this.closest('.fixed').remove()" class="absolute top-3 right-3 p-2 hover:bg-gray-100 rounded-full text-gray-500 hover:text-gray-800">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
      <h2 class="text-xl font-semibold mb-4 text-purple-700">Thông tin thanh toán</h2>

      <form id="checkout-form" class="space-y-4">
        <input id="checkout-name" type="text" placeholder="Họ và tên" class="w-full border p-2 rounded" required>
        <input id="checkout-phone" type="tel" placeholder="Số điện thoại" class="w-full border p-2 rounded" required>
        <input id="checkout-address" type="text" placeholder="Địa chỉ giao hàng" class="w-full border p-2 rounded" required>
        <textarea id="checkout-note" placeholder="Ghi chú (nếu có)" class="w-full border p-2 rounded"></textarea>

        <div>
          <label class="block font-medium text-gray-700 mb-1">Hình thức thanh toán</label>
          <div class="space-y-2">
            <label class="flex items-center gap-2">
              <input type="radio" name="checkout-payment" value="Thanh toán khi nhận hàng (COD)" checked>
              Thanh toán khi nhận hàng (COD)
            </label>

            <label class="flex items-center gap-2">
              <input type="radio" name="checkout-payment" value="Chuyển khoản ngân hàng">
              Chuyển khoản ngân hàng (MB Bank)
            </label>
            <div id="bank-info" class="hidden bg-gray-50 border p-2 rounded text-sm">
              💳 <strong>MB Bank</strong><br>
              👤 LÊ ĐẠI DƯƠNG<br>
              🔢 0988007529
            </div>

            <label class="flex items-center gap-2">
              <input type="radio" name="checkout-payment" value="Ví Momo">
              Ví Momo
            </label>
            <div id="momo-info" class="hidden bg-gray-50 border p-2 rounded text-sm">
              📱 0988007529<br>
              👤 LÊ ĐẠI DƯƠNG<br>
              <img src="https://i.postimg.cc/nzymLcRf/97f5d400-3296-4151-9478-cc01e923681c.jpg" alt="QR Momo" class="w-40 mt-2 rounded-lg">
            </div>
          </div>
        </div>

        <button type="submit" class="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition">
          Xác nhận đặt hàng
        </button>
      </form>
    </div>
  `;
  document.body.appendChild(checkoutModal);

  // Hiển thị chi tiết theo hình thức thanh toán
  const radios = checkoutModal.querySelectorAll('input[name="checkout-payment"]');
  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      checkoutModal.querySelector('#bank-info').classList.toggle('hidden', radio.value !== 'Chuyển khoản ngân hàng');
    });
  });

  // Gửi email qua EmailJS
  const form = checkoutModal.querySelector('#checkout-form');
  
  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = form.querySelector('#checkout-name').value.trim();
    const phone = form.querySelector('#checkout-phone').value.trim();
    const address = form.querySelector('#checkout-address').value.trim();
    const note = form.querySelector('#checkout-note').value.trim();
    const payment = form.querySelector('input[name="checkout-payment"]:checked').value;

    // SỬA LOGIC: Tính toán dựa trên itemsToCheckout
    const cartItems = itemsToCheckout.map(item => `${item.name} - SL: ${item.quantity} x ${formatPrice(item.price)}`).join('\n');
    const total = formatPrice(itemsToCheckout.reduce((sum, item) => sum + item.subtotal, 0));

    const templateParams = {
      checkout_name: name,
      checkout_phone: phone,
      checkout_address: address,
      checkout_note: note || 'Không có ghi chú',
      checkout_payment: payment,
      checkout_cart: cartItems,
      checkout_total: total
    };
    
    emailjs.send("service_h8tuoqb", "template_t1612tv", templateParams)
      .then(async () => {
        alert('🎉 Đơn hàng đã được gửi thành công! Bạn sẽ nhận email xác nhận sớm.');
        
        const user = auth.currentUser;
        
        // SỬA LOGIC: Dùng itemsToCheckout và thêm logic cho Guest
        if (user) {
          // 1. User đã đăng nhập (Lưu vào Firestore)
          try {
            const orderData = {
              customerInfo: templateParams,
              items: itemsToCheckout, // Chỉ lưu món đã mua
              totalAmount: itemsToCheckout.reduce((sum, item) => sum + item.subtotal, 0),
              createdAt: firebase.firestore.FieldValue.serverTimestamp()
            };
            await db.collection('users').doc(user.uid).collection('orders').add(orderData);
            console.log('Đã lưu đơn hàng vào lịch sử (Firestore).');
          } catch (err) {
            console.error("Lỗi khi lưu lịch sử đơn hàng (Firestore):", err);
          }
        } else {
          // 2. Khách (Lưu vào LocalStorage)
          try {
            const orderData = {
              customerInfo: templateParams,
              items: itemsToCheckout, // Chỉ lưu món đã mua
              totalAmount: itemsToCheckout.reduce((sum, item) => sum + item.subtotal, 0),
              createdAt: new Date().toISOString() // Dùng ISO string cho LocalStorage
            };
            // Lấy lịch sử cũ, thêm món mới, lưu lại
            let history = JSON.parse(localStorage.getItem('guestOrderHistory') || '[]');
            history.push(orderData);
            localStorage.setItem('guestOrderHistory', JSON.stringify(history));
            console.log('Đã lưu đơn hàng vào lịch sử (LocalStorage).');
          } catch (err)
 {
            console.error("Lỗi khi lưu lịch sử đơn hàng (LocalStorage):", err);
          }
        }

        checkoutModal.remove();
        
        // SỬA LOGIC: Chỉ xóa các món đã chọn khỏi giỏ hàng
        cart = cart.filter(item => !item.selected);
        updateCartDisplay(); 
        
        if (user) {
            saveCartForUser(user.uid); // Lưu giỏ hàng (đã xóa món)
        } else {
            localStorage.setItem('guestCart', JSON.stringify(cart)); // Lưu giỏ hàng (đã xóa món)
        }
      })
      .catch(err => {
        console.error('Lỗi gửi email:', err);
        alert('❌ Gửi email thất bại. Vui lòng thử lại.');
      });
  });
} 


// *** CÁC HÀM RENDER SẢN PHẨM ***

function renderProductCard(product) {
    // Hàm này tạo ra HTML cho một sản phẩm từ mảng data
    return `
        <div class="group cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 product-card" data-category="${product.category}" data-name="${product.name.toLowerCase()}">
            <div class="relative overflow-hidden rounded-t-2xl aspect-square bg-gradient-to-br from-${product.color}-100 to-${product.color}-200">
                <div class="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <div class="perfume-bottle w-32 h-40 shimmer">
                        <div class="absolute top-2 left-1/2 transform -translate-x-1/2 w-4 h-6 bg-gradient-to-b from-gray-300 to-gray-400 rounded-t"></div>
                        <div class="absolute top-8 left-1/2 transform -translate-x-1/2 w-16 h-24 bg-gradient-to-b from-${product.color}-300 to-${product.color}-500 rounded opacity-80"></div>
                    </div>
                </div>
                ${product.tag ? `<div class="absolute top-4 right-4 bg-gray-900 text-white px-2 py-1 rounded-full text-xs font-semibold">${product.tag}</div>` : ''}
                <div class="absolute top-4 left-4 bg-${product.category === 'nam' ? 'blue' : product.category === 'nu' ? 'pink' : 'green'}-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    ${product.category === 'nam' ? 'Nam' : product.category === 'nu' ? 'Nữ' : 'Unisex'}
                </div>
            </div>
            <div class="p-6 space-y-3">
                <h4 class="text-xl font-semibold text-gray-900">${product.name}</h4>
                <p class="text-gray-600 text-sm">${product.desc}</p>
                <div class="flex items-center justify-between">
                    <span class="text-2xl font-bold text-purple-600">
                        ${formatPrice(product.price)}
                    </span> 
                    <button class="px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-semibold hover:bg-purple-700 transition-colors whitespace-nowrap flex-shrink-0"
        onclick="addToCart('${product.name}', ${product.price}, this)"
        data-image="${product.image}">
  Thêm vào giỏ
</button>
                </div>
            </div>
        </div>
    `;
}

function renderProducts(productsToRender) {
    const grid = document.getElementById('products-grid');
    if (grid) {
        grid.innerHTML = productsToRender.map(renderProductCard).join('');
    }
}

function filterProducts(btnElement, category) {
  const buttons = document.querySelectorAll('#filter-buttons button');
  buttons.forEach(btn => {
    btn.classList.add('simple-button-outline');
    btn.classList.remove('simple-button');
  });

  btnElement.classList.add('simple-button');
  btnElement.classList.remove('simple-button-outline');

  const filtered = productsData.filter(p => category === 'all' || p.category === category);
  renderProducts(filtered);
}


// *** CÁC HÀM QUẢN LÝ GIỎ HÀNG ***

// ⭐ HÀM NÀY ĐÃ SỬA: Thêm "selected: true"
function addToCart(productName, price, buttonElement) {
    const imageSrc = buttonElement.getAttribute('data-image') || '❓'; 
    const existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
        existingItem.quantity += 1;
        existingItem.subtotal += price;
        existingItem.selected = true; // Luôn chọn khi thêm/bấm lại
    } else {
        cart.push({
            name: productName,
            price: price,
            quantity: 1,
            subtotal: price,
            image: imageSrc,
            selected: true // Món mới luôn được chọn
        });
    }

    updateCartDisplay(); // Cập nhật giỏ hàng (sẽ tính tổng)
    showNotification(`Đã thêm 1 x "${productName}" vào giỏ hàng!`);

    const user = firebase.auth().currentUser;
    if (user) {
      saveCartForUser(user.uid);
    } else {
      localStorage.setItem('guestCart', JSON.stringify(cart));
    }
}

// ⭐ HÀM NÀY ĐÃ SỬA: Tự động chọn khi bấm "+"
function setQuantity(productName, delta) {
    const itemIndex = cart.findIndex(item => item.name === productName);
    
    if (itemIndex > -1) {
        const item = cart[itemIndex];
        const newQuantity = item.quantity + delta;

        if (newQuantity > 0) {
            item.quantity = newQuantity;
            item.subtotal = item.price * newQuantity;
            if (delta > 0) {
                item.selected = true; // Tự động chọn khi bấm "+"
            }
        } else {
            // Xóa sản phẩm nếu số lượng về 0
            cart.splice(itemIndex, 1);
        }
        
        updateCartDisplay(); // Cập nhật tổng tiền và nút
    }

    const user = firebase.auth().currentUser;
    if (user) {
      saveCartForUser(user.uid);
    } else {
      localStorage.setItem('guestCart', JSON.stringify(cart));
    }
}

// Hàm này giữ nguyên (chỉ cần gọi updateCartDisplay)
function deleteItem(productName) {
    const itemIndex = cart.findIndex(item => item.name === productName);
    
    if (itemIndex > -1) {
        cart.splice(itemIndex, 1);
        updateCartDisplay(); // Tính lại tổng và cập nhật
    }

    const user = firebase.auth().currentUser;
    if (user) {
      saveCartForUser(user.uid);
    } else {
      localStorage.setItem('guestCart', JSON.stringify(cart));
    }
}

// ⭐ HÀM MỚI: Bật/tắt tickbox
function toggleCartItemSelection(productName) {
    const item = cart.find(i => i.name === productName);
    if (item) {
        item.selected = !item.selected; // Đảo ngược trạng thái
    }
    
    updateCartDisplay(); // Cập nhật lại tổng tiền và nút

    // Lưu trạng thái selected mới
    const user = firebase.auth().currentUser;
    if (user) {
      saveCartForUser(user.uid);
    } else {
      localStorage.setItem('guestCart', JSON.stringify(cart));
    }
}


// ⭐ HÀM NÀY ĐÃ SỬA: Thêm checkbox, tính tổng món đã chọn, bật/tắt nút
// ⭐ THAY THẾ HÀM NÀY:
// (Đã bọc checkbox và ảnh vào chung 1 div để không vỡ layout)
// ⭐ THAY THẾ TOÀN BỘ HÀM NÀY:
function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotalEl = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-button'); 

    // Cập nhật số lượng tổng (vẫn đếm tất cả)
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Tính tổng các món ĐÃ CHỌN
    cartTotal = cart
        .filter(item => item.selected) 
        .reduce((total, item) => total + item.subtotal, 0);
    
    cartTotalEl.textContent = formatPrice(cartTotal);

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-gray-500 text-center">Giỏ hàng trống</p>';
    } else {
        // ⭐ HTML ĐÃ ĐƯỢC THAY ĐỔI CẤU TRÚC ĐỂ SỬA LỖI RESPONSIVE
        cartItems.innerHTML = cart.map(item => `
            <div class="flex items-start p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                
                <input type="checkbox" 
                       ${item.selected ? 'checked' : ''} 
                       onchange="toggleCartItemSelection('${item.name}')">

                <div class="flex-1 min-w-0">
                    
                    <div class="flex">
                        <div class="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center flex-shrink-0">
                            ${item.image.includes('/') 
                                ? `<img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover rounded-md">`
                                : `<span class="text-3xl">${item.image || '❓'}</span>`} 
                        </div>
                        <div class="flex-1 min-w-0 ml-4">
                            <p class="font-semibold text-gray-900 truncate">${item.name}</p>
                            <p class="text-xs text-gray-500">${formatPrice(item.price)} / sản phẩm</p>
                        </div>
                    </div>

                    <div class="flex items-center justify-between mt-3">
                        <div class="flex items-center">
                            <button onclick="setQuantity('${item.name}', -1)" class="w-6 h-6 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300 transition-colors flex items-center justify-center text-lg leading-none">-</button>
                            <span class="mx-2 font-medium">${item.quantity}</span>
                            <button onclick="setQuantity('${item.name}', 1)" class="w-6 h-6 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors flex items-center justify-center text-lg leading-none">+</button>
                        </div>
                        
                        <div class="text-right flex flex-col items-end flex-shrink-0">
                            <p class="font-bold text-purple-600">${formatPrice(item.subtotal)}</p>
                            <button onclick="deleteItem('${item.name}')" class="text-red-500 hover:text-red-700 mt-1 p-1">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Logic bật/tắt nút thanh toán (Giữ nguyên)
    const anySelected = cart.some(item => item.selected);
    if (checkoutBtn) {
        checkoutBtn.disabled = !anySelected;
    }
}

function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.classList.toggle('hidden');
}

// *** CÁC HÀM XEM LỊCH SỬ ***

function toggleHistoryModal() {
    const historyModal = document.getElementById('history-modal');
    historyModal.classList.toggle('hidden');
}

// ⭐ HÀM NÀY ĐÃ SỬA: Tải lịch sử cho cả Guest
async function loadOrderHistory() {
    const user = auth.currentUser;
    const historyItemsContainer = document.getElementById('history-items');
    
    toggleHistoryModal(); // Mở modal trước
    historyItemsContainer.innerHTML = '<p class="text-gray-500 text-center">Đang tải lịch sử...</p>';

    if (user) {
        // 1. USER ĐÃ ĐĂNG NHẬP (Dùng Firestore)
        try {
            const querySnapshot = await db.collection('users').doc(user.uid).collection('orders')
                                        .orderBy('createdAt', 'desc')
                                        .limit(20) 
                                        .get();
            if (querySnapshot.empty) {
                historyItemsContainer.innerHTML = '<p class="text-gray-500 text-center">Bạn chưa có đơn hàng nào.</p>';
                return;
            }
            let html = '';
            querySnapshot.forEach(doc => {
                const order = doc.data();
                const date = order.createdAt ? order.createdAt.toDate().toLocaleDateString('vi-VN') : 'N/A';
                const itemsHtml = order.items.map(item => `
                    <div class="flex items-center justify-between text-sm">
                        <p class="truncate pr-2">${item.name} (x${item.quantity})</p>
                        <p class="font-medium flex-shrink-0">${formatPrice(item.subtotal)}</p>
                    </div>
                `).join('');
                
                // (HTML cho thẻ đơn hàng)
                html += `
                    <div class="border border-gray-200 rounded-lg p-4 space-y-2 shadow-sm">
                        <div class="flex justify-between items-center pb-2 border-b">
                            <p class="font-bold text-lg text-purple-600">${formatPrice(order.totalAmount)}</p>
                            <p class="text-xs text-gray-500">${date}</p>
                        </div>
                        <div class="space-y-1 max-h-32 overflow-y-auto pr-1">
                            ${itemsHtml}
                        </div>
                        <div class="text-xs text-gray-600 pt-2 border-t mt-2">
                            <p><strong>Giao đến:</strong> ${order.customerInfo.checkout_name}, ${order.customerInfo.checkout_address}</p>
                        </div>
                    </div>
                `;
            });
            historyItemsContainer.innerHTML = html;
        } catch (err) {
            console.error("Lỗi tải lịch sử (Firestore):", err);
            historyItemsContainer.innerHTML = '<p class="text-red-500 text-center">Lỗi khi tải lịch sử. Vui lòng thử lại.</p>';
        }
    } else {
        // 2. KHÁCH (Dùng LocalStorage)
        try {
            let history = JSON.parse(localStorage.getItem('guestOrderHistory') || '[]');
            
            if (history.length === 0) {
                historyItemsContainer.innerHTML = '<p class="text-gray-500 text-center">Bạn chưa có đơn hàng nào.</p>';
                return;
            }
            
            // Sắp xếp thủ công (mới nhất lên đầu)
            history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            let html = '';
            history.forEach(order => {
                // Format ngày từ ISOString
                const date = new Date(order.createdAt).toLocaleDateString('vi-VN');
                const itemsHtml = order.items.map(item => `
                    <div class="flex items-center justify-between text-sm">
                        <p class="truncate pr-2">${item.name} (x${item.quantity})</p>
                        <p class="font-medium flex-shrink-0">${formatPrice(item.subtotal)}</p>
                    </div>
                `).join('');
                
                html += `
                    <div class="border border-gray-200 rounded-lg p-4 space-y-2 shadow-sm">
                        <div class="flex justify-between items-center pb-2 border-b">
                            <p class="font-bold text-lg text-purple-600">${formatPrice(order.totalAmount)}</p>
                            <p class="text-xs text-gray-500">${date}</p>
                        </div>
                        <div class="space-y-1 max-h-32 overflow-y-auto pr-1">
                            ${itemsHtml}
                        </div>
                        <div class="text-xs text-gray-600 pt-2 border-t mt-2">
                            <p><strong>Giao đến:</strong> ${order.customerInfo.checkout_name}, ${order.customerInfo.checkout_address}</p>
                        </div>
                    </div>
                `;
            });
            historyItemsContainer.innerHTML = html;
        } catch (err) {
            console.error("Lỗi tải lịch sử (LocalStorage):", err);
            historyItemsContainer.innerHTML = '<p class="text-red-500 text-center">Lỗi khi tải lịch sử. Vui lòng thử lại.</p>';
        }
    }
}


// *** TÌM KIẾM VÀ CÁC HÀM KHÁC ***

function toggleSearchModal() {
    const searchModal = document.getElementById('search-modal');
    searchModal.classList.toggle('hidden');
}

// (Hàm này là hàm cũ, có thể xóa đi, vì đã có handleCheckout2())
function handleCheckout() {
    if (cart.length === 0) {
        showNotification('Giỏ hàng trống!');
        return;
    }
    showNotification(`Cảm ơn bạn! Đơn hàng ${formatPrice(cartTotal)} đã được ghi nhận.`);
    cart = [];
    cartTotal = 0;
    updateCartDisplay();
    toggleCart();
}

function formatPrice(price) {
return new Intl.NumberFormat('vi-VN', {
style: 'currency',
currency: 'VND'
}).format(price);
}

function performSearch() {
  const searchTerm = document.getElementById('search-input').value.toLowerCase().trim();
  const resultsContainer = document.getElementById('search-results');
  resultsContainer.innerHTML = '';

  if (searchTerm.length < 2) {
    resultsContainer.innerHTML = '<p class="text-gray-500 text-center">Nhập ít nhất 2 ký tự</p>';
    return;
  }

  function normalize(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  const normalizedTerm = normalize(searchTerm);

  const searchResults = productsData.filter(product => {
    const name = normalize(product.name);
    const desc = normalize(product.desc);
    return (
      name.includes(normalizedTerm) ||
      desc.includes(normalizedTerm) ||
      normalizedTerm.split(" ").some(word => name.includes(word) || desc.includes(word))
    );
  });

  if (searchResults.length === 0) {
    resultsContainer.innerHTML = `<p class="text-gray-500 text-center">Không tìm thấy sản phẩm nào cho "${searchTerm}"</p>`;
    return;
  }

  resultsContainer.innerHTML = '';
  searchResults.forEach(product => {
    const div = document.createElement('div');
    div.className = 'cursor-pointer p-4 border rounded-lg hover:bg-purple-50 transition';
    div.innerHTML = `
      <div class="font-semibold text-gray-900">${product.name}</div>
      <div class="text-sm text-gray-600 truncate">${product.desc}</div>
      <div class="text-purple-600 font-bold">${formatPrice(product.price)}</div>
    `;
    div.addEventListener('click', () => focusProduct(product.name));
    resultsContainer.appendChild(div);
  });
}
function focusProduct(productName) {
  const searchModal = document.getElementById('search-modal');
  if (searchModal && !searchModal.classList.contains('hidden')) {
    toggleSearchModal();
  }
  const allProducts = document.querySelectorAll('.product-card');
  const targetName = productName.toLowerCase();
  let foundCard = null;

  allProducts.forEach(card => {
    if (card.dataset.name === targetName) {
      foundCard = card;
    }
  });

  if (foundCard) {
    const cardRect = foundCard.getBoundingClientRect();
    const offset = cardRect.top + window.scrollY - window.innerHeight / 2 + cardRect.height / 2;
    window.scrollTo({ top: offset, behavior: 'smooth' });
    foundCard.classList.add('ring-4', 'ring-purple-400', 'transition-all', 'duration-300');
    setTimeout(() => {
      foundCard.classList.remove('ring-4', 'ring-purple-400');
    }, 2000);
  } else {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => focusProduct(productName), 600);
  }
}

// Form handlers
function handleNewsletter(event) {
event.preventDefault();
const messageEl = document.getElementById('newsletter-message');
const form = event.target;
const email = form.querySelector('input[type="email"]').value;
messageEl.textContent = `Cảm ơn bạn! Chúng tôi sẽ gửi thông tin cập nhật đến ${email}`;
messageEl.style.color = '#10b981';
form.reset();
setTimeout(() => {
messageEl.textContent = '';
}, 500);
}
function handleContactForm(event) {
event.preventDefault();
const messageEl = document.getElementById('contact-message');
const form = event.target;
messageEl.textContent = 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong vòng 24 giờ.';
messageEl.style.color = '#10b981';
form.reset();
setTimeout(() => {
messageEl.textContent = '';
}, 500);
}
// Policy links
function showPolicy(policyType) {
const policies = {
privacy: 'Chính sách bảo mật: Chúng tôi cam kết bảo vệ thông tin cá nhân của khách hàng.',
return: 'Chính sách đổi trả: Đổi trả trong vòng 7 ngày nếu sản phẩm có lỗi.',
shipping: 'Chính sách vận chuyển: Giao hàng miễn phí cho đơn hàng trên 1.000.000₫.',
terms: 'Điều khoản sử dụng: Vui lòng đọc kỹ trước khi sử dụng dịch vụ.'
};
showNotification(policies[policyType] || 'Thông tin chính sách');
}
// Notification system
function showNotification(message) {
const notification = document.createElement('div');
notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
notification.textContent = message;
document.body.appendChild(notification);
setTimeout(() => {
notification.remove();
}, 500);
}
// Navigation highlighting
function updateActiveNavLink() {
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
let current = '';
sections.forEach(section => {
const sectionTop = section.offsetTop - 100;
if (window.scrollY >= sectionTop) {
current = section.getAttribute('id');
}
});
navLinks.forEach(link => {
link.classList.remove('active');
if (link.getAttribute('href') === `#${current}`) {
link.classList.add('active');
}
});
}

// Element SDK implementation
async function onConfigChange(config) {
const customFont = config.font_family || defaultConfig.font_family;
const baseSize = config.font_size || defaultConfig.font_size;
const baseFontStack = 'system-ui, -apple-system, sans-serif';
document.getElementById('store-name').textContent = config.store_name || defaultConfig.store_name;
document.getElementById('tagline').textContent = config.tagline || defaultConfig.tagline;
document.getElementById('hero-title').textContent = config.hero_title || defaultConfig.hero_title;
document.getElementById('hero-subtitle').textContent = config.hero_subtitle || defaultConfig.hero_subtitle;
document.getElementById('cta-button').textContent = config.cta_button || defaultConfig.cta_button;
document.getElementById('phone-number').textContent = config.phone_number || defaultConfig.phone_number;
document.getElementById('email-address').textContent = config.email_address || defaultConfig.email_address;
document.getElementById('address').textContent = config.address || defaultConfig.address;
const backgroundColor = config.background_color || defaultConfig.background_color;
const surfaceColor = config.surface_color || defaultConfig.surface_color;
const textColor = config.text_color || defaultConfig.text_color;
const primaryActionColor = config.primary_action_color || defaultConfig.primary_action_color;
const secondaryActionColor = config.secondary_action_color || defaultConfig.secondary_action_color;
document.body.style.backgroundColor = backgroundColor;
document.body.style.color = textColor;
const surfaces = document.querySelectorAll('.bg-gray-50, .perfume-bottle');
surfaces.forEach(el => {
el.style.backgroundColor = surfaceColor;
});
const primaryButtons = document.querySelectorAll('#cta-button, .bg-purple-600');
primaryButtons.forEach(btn => {
btn.style.backgroundColor = primaryActionColor;
btn.style.borderColor = primaryActionColor;
});
const secondaryButtons = document.querySelectorAll('.bg-gray-900, .border-gray-300');
secondaryButtons.forEach(btn => {
btn.style.backgroundColor = secondaryActionColor;
btn.style.borderColor = secondaryActionColor;
});
document.body.style.fontFamily = `${customFont}, ${baseFontStack}`;
const headings = document.querySelectorAll('h1, h2, h3, h4');
headings.forEach(h => {
if (h.tagName === 'H1') {
h.style.fontSize = `${baseSize * 1.5}px`;
} else if (h.tagName === 'H2') {
h.style.fontSize = `${baseSize * 2.5}px`;
} else if (h.tagName === 'H3') {
h.style.fontSize = `${baseSize * 2}px`;
} else {
h.style.fontSize = `${baseSize * 1.25}px`;
}
});
}
function mapToCapabilities(config) {
return {
recolorables: [
{
get: () => config.background_color || defaultConfig.background_color,
set: (value) => {
config.background_color = value;
window.elementSdk.setConfig({ background_color: value });
}
},
{
get: () => config.surface_color || defaultConfig.surface_color,
set: (value) => {
config.surface_color = value;
window.elementSdk.setConfig({ surface_color: value });
}
},
{
get: () => config.text_color || defaultConfig.text_color,
set: (value) => {
config.text_color = value;
window.elementSdk.setConfig({ text_color: value });
}
},
{
get: () => config.primary_action_color || defaultConfig.primary_action_color,
set: (value) => {
config.primary_action_color = value;
window.elementSdk.setConfig({ primary_action_color: value });
}
},
{
get: () => config.secondary_action_color || defaultConfig.secondary_action_color,
set: (value) => {
config.secondary_action_color = value;
window.elementSdk.setConfig({ secondary_action_color: value });
}
}
],
borderables: [],
fontEditable: {
get: () => config.font_family || defaultConfig.font_family,
set: (value) => {
config.font_family = value;
window.elementSdk.setConfig({ font_family: value });
}
},
fontSizeable: {
get: () => config.font_size || defaultConfig.font_size,
set: (value) => {
config.font_size = value;
window.elementSdk.setConfig({ font_size: value });
}
}
};
}
function mapToEditPanelValues(config) {
return new Map([
["store_name", config.store_name || defaultConfig.store_name],
["tagline", config.tagline || defaultConfig.tagline],
["hero_title",  config.hero_title || defaultConfig.hero_title],
["hero_subtitle", config.hero_subtitle || defaultConfig.hero_subtitle],
["cta_button", config.cta_button || defaultConfig.cta_button],
["phone_number", config.phone_number || defaultConfig.phone_number],
["email_address", config.email_address || defaultConfig.email_address],
["address", config.address || defaultConfig.address]
]);
}
// Initialize Element SDK
if (window.elementSdk) {
window.elementSdk.init({
defaultConfig,
onConfigChange,
mapToCapabilities,
mapToEditPanelValues
});
}

// *** PHẦN QUAN TRỌNG: FIREBASE VÀ AUTH ***

// Cấu hình Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDOSTp5iDf7f4FVfOKeqtmFgMlKL9mdXFI",
    authDomain: "taphoasinhvien-48e28.firebaseapp.com",
    projectId: "taphoasinhvien-48e28",
    storageBucket: "taphoasinhvien-48e28.firebasestorage.app",
    messagingSenderId: "1060888508273",
    appId: "1:1060888508273:web:53443305cba0a7f6ff28d0",
    measurementId: "G-T61L369KG7"
};

// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Hàm lưu/đọc giỏ hàng (đã bao gồm "selected")
async function saveCartForUser(uid) {
  if (!uid) return;
  try {
    await db.collection('users').doc(uid).set({
      cart: cart,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  } catch (err) {
    console.error('Lỗi lưu giỏ hàng:', err);
  }
}
async function loadCartForUser(uid) {
  if (!uid) return [];
  try {
    const doc = await db.collection('users').doc(uid).get();
    if (doc.exists && doc.data().cart) {
      return doc.data().cart || [];
    } else {
      return [];
    }
  } catch (err) {
    console.error('Lỗi đọc giỏ hàng:', err);
    return [];
  }
}

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// Logic Đăng nhập / Đăng xuất
function loginWithGoogle() {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        console.log("Đăng nhập thành công:", user);
        showNotification(`Chào mừng ${user.displayName}!`);
        // Đóng menu mobile nếu đang mở
        const mobileMenu = document.getElementById('mobile-menu');
        if (!mobileMenu.classList.contains('hidden-mobile')) {
            mobileMenu.classList.add('hidden-mobile');
        }
      })
      .catch((error) => {
        console.error("Lỗi đăng nhập:", error);
        showNotification("Đăng nhập thất bại: " + error.message);
      });
}

function logout() {
    auth.signOut().then(() => {
      showNotification("Bạn đã đăng xuất.");
    }).catch((error) => {
      console.error("Lỗi đăng xuất:", error);
    });
}

// ⭐ HÀM NÀY ĐÃ SỬA: Gộp giỏ hàng (merge 'selected') và tải giỏ hàng Guest
auth.onAuthStateChanged(async (user) => {
        
    const loginButton = document.getElementById('login-button');
    const userInfoDiv = document.getElementById('user-info');
    const mobileLoginButton = document.getElementById('mobile-login-button');
    const mobileUserInfoDiv = document.getElementById('mobile-user-info');

    if (user) {
      // ========= 1. USER ĐĂNG NHẬP =========
      loginButton.classList.add('hidden');
      userInfoDiv.classList.remove('hidden');
      userInfoDiv.classList.add('flex');
      mobileLoginButton.classList.add('hidden');
      mobileUserInfoDiv.classList.remove('hidden');
      mobileUserInfoDiv.classList.add('flex');
      document.getElementById('user-name').textContent = user.displayName;
      document.getElementById('mobile-user-name').textContent = user.displayName;

      // XỬ LÝ GIỎ HÀNG (CẬP NHẬT)
      const serverCart = await loadCartForUser(user.uid);
      const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
      const merged = {};

      function addItemsToMap(items) {
          (items || []).forEach(i => {
              if (i.price && i.quantity) {
                  i.subtotal = i.price * i.quantity;
              }
              
              if (!merged[i.name]) {
                  merged[i.name] = { ...i, selected: i.selected || false }; 
              } else {
                  merged[i.name].quantity += i.quantity;
                  if (merged[i.name].price && merged[i.name].quantity) {
                      merged[i.name].subtotal = merged[i.name].price * merged[i.name].quantity;
                  }
                  // Ưu tiên trạng thái selected của giỏ khách (vì mới hơn)
                  merged[i.name].selected = i.selected || merged[i.name].selected;
              }
          });
      }
      addItemsToMap(serverCart);
      addItemsToMap(guestCart);

      cart = Object.values(merged);
      saveCartForUser(user.uid);
      localStorage.removeItem('guestCart');
      
    } else {
      // ========= 2. USER ĐĂNG XUẤT / KHÁCH =========
      loginButton.classList.remove('hidden');
      loginButton.classList.add('flex');
      userInfoDiv.classList.add('hidden');
      userInfoDiv.classList.remove('flex');
      mobileLoginButton.classList.remove('hidden');
      mobileUserInfoDiv.classList.add('hidden');
      mobileUserInfoDiv.classList.remove('flex');

      // Lấy giỏ hàng của khách từ localStorage
      cart = JSON.parse(localStorage.getItem('guestCart') || '[]');
    }

    // Cập nhật giỏ hàng (tính lại tổng tiền, bật/tắt nút)
    updateCartDisplay();
});

// *** KHỞI CHẠY LẦN ĐẦU ***
document.addEventListener('DOMContentLoaded', () => {
    // Phải chờ DOM load mới chạy các hàm render và update
    updateCartDisplay(); // Cập nhật giỏ hàng (và nút) khi tải trang
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Initial call
    renderProducts(productsData); // Hiển thị sản phẩm
});

