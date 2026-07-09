document.addEventListener('DOMContentLoaded', () => {
    const langBtn = document.getElementById('lang-toggle');
    const langText = document.getElementById('lang-text');
    const body = document.body;
    const themeBtn = document.getElementById('theme-toggle');
    const themeIcon = themeBtn.querySelector('i');

    // เช็คว่าเคยเลือกธีมไว้ไหม
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else {
        body.classList.remove('light-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    themeBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode');
    
        if (body.classList.contains('light-mode')) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Initial translation
    if (body.classList.contains('lang-th')) {
        translate('th');
    } else {
        translate('en');
    }

    // ระบบสลับภาษา
    langBtn.addEventListener('click', () => {
        if (body.classList.contains('lang-en')) {
            // สลับไปไทย
            body.classList.replace('lang-en', 'lang-th');
            langText.innerText = 'EN';
            translate('th');
        } else {
            // สลับไปอังกฤษ
            body.classList.replace('lang-th', 'lang-en');
            langText.innerText = 'TH';
            translate('en');
        }
    });

    function translate(lang) {
        const elements = document.querySelectorAll('[data-en]');
        elements.forEach(el => {
            el.innerText = el.getAttribute(`data-${lang}`);
        });

        // แปลเปลี่ยน placeholder สำหรับช่องกรอกข้อมูล
        const inputs = document.querySelectorAll('[data-en-placeholder]');
        inputs.forEach(el => {
            el.setAttribute('placeholder', el.getAttribute(`data-${lang}-placeholder`));
        });
    }

    // Scroll reveal animation อย่างง่าย
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.skill-box, .project-card, .edu-card, .exp-card, .guestbook-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = '0.8s ease-out';
        observer.observe(el);
    });

    // Smooth scrolling & Scroll Spy for Navbar
    const navSections = document.querySelectorAll('#about, #skills, #experience, #projects, #guestbook');
    const topNavLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;
        
        navSections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        topNavLinks.forEach(link => {
            link.classList.remove('active');
            if (current && link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    topNavLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // ตรวจสอบว่าเป็นลิงก์ Anchor ภายในหน้าเดียวกันหรือไม่
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetEl = document.getElementById(targetId);
                
                // ปิดเมนุมือถือเมื่อคลิกเลือก
                if (window.innerWidth <= 800) {
                    const navLinks = document.querySelector('.nav-links');
                    if (navLinks) navLinks.classList.remove('nav-open');
                    const menuIcon = document.querySelector('#mobile-menu-btn i');
                    if (menuIcon) menuIcon.classList.replace('fa-times', 'fa-bars');
                }

                if (targetEl) {
                    window.scrollTo({
                        top: targetEl.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            } else if (href.includes('#')) {
                // ถ้าเป็นลิงก์ข้ามหน้า (เช่น index.html#about)
                const pathParts = window.location.pathname.split('/');
                const currentPage = pathParts[pathParts.length - 1];
                const targetPage = href.split('#')[0];
                const targetId = href.split('#')[1];

                // เช็คว่าอยู่หน้าเป้าหมายอยู่แล้วหรือไม่
                const isOnTargetPage = currentPage === targetPage || 
                                     (targetPage === 'index.html' && (currentPage === '' || currentPage === 'index.html'));

                if (isOnTargetPage) {
                    e.preventDefault();
                    const targetEl = document.getElementById(targetId);
                    
                    if (window.innerWidth <= 800) {
                        const navLinks = document.querySelector('.nav-links');
                        if (navLinks) navLinks.classList.remove('nav-open');
                        const menuIcon = document.querySelector('#mobile-menu-btn i');
                        if (menuIcon) menuIcon.classList.replace('fa-times', 'fa-bars');
                    }

                    if (targetEl) {
                        window.scrollTo({
                            top: targetEl.offsetTop - 100,
                            behavior: 'smooth'
                        });
                    }
                }
                // ถ้าไม่ได้อยู่หน้าเดียวกัน (เช่น อยู่หน้า internship.html แล้วกดลิงก์ไปหน้า index.html#about)
                // จะปล่อยให้บราวเซอร์เปลี่ยนหน้าแบบปกติ ไม่ต้องเรียก e.preventDefault()
            }
        });
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('nav-open');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinksContainer.classList.contains('nav-open')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    }

    // Mouse Glow Effect Tracking
    const mouseGlow = document.getElementById('mouse-glow');
    if (mouseGlow) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;
            // Use accent colors depending on theme
            const color = document.body.classList.contains('light-mode') 
                ? 'rgba(37, 99, 235, 0.08)' // blue accent for light mode
                : 'rgba(249, 212, 35, 0.08)'; // yellow/orange for dark mode
                
            mouseGlow.style.background = `radial-gradient(600px circle at ${x}px ${y}px, ${color}, transparent 80%)`;
        });
    }

    // === Firebase Guestbook Setup ===
    // น้องสามารถแก้ไขข้อมูล Config ตรงนี้เพื่อเชื่อมต่อ Firebase ของน้องได้เลยครับ
    const firebaseConfig = {
    apiKey: "AIzaSyDecWOet-QFlJKtTZ_HbPgDbHbZpSz_m_Y",
    authDomain: "myresume-fa9ae.firebaseapp.com",
    projectId: "myresume-fa9ae",
    storageBucket: "myresume-fa9ae.firebasestorage.app",
    messagingSenderId: "903030739983",
    appId: "1:903030739983:web:90013087de616e186dbf7a",
    measurementId: "G-7QVR710M92"
  };

    const messagesList = document.getElementById('guestbook-list');
    const guestbookForm = document.getElementById('guestbook-form');

    // variables to share state in mock mode
    let mockMessages = [
        { id: "demo-1", name: "สมศักดิ์ รักดี (ตัวอย่าง)", message: "ยินดีที่ได้รู้จักครับ เว็บไซต์สวยงามและดูลื่นไหลดีมากเลยครับ ขอให้ได้งานไว ๆ นะครับ!", timestamp: new Date() },
        { id: "demo-2", name: "Jane Doe (Demo)", message: "Awesome portfolio! The dynamic background and smooth transitions look premium.", timestamp: new Date(Date.now() - 3600000 * 24) }
    ];

    // ตรวจสอบว่าได้แก้ Config หรือยัง
    if (typeof firebase !== 'undefined' && firebaseConfig.apiKey !== "YOUR_API_KEY") {
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();

        // 1. ดึงข้อมูลข้อความแบบ Real-time
        db.collection("guestbook")
          .orderBy("timestamp", "desc")
          .limit(50)
          .onSnapshot((snapshot) => {
              messagesList.innerHTML = "";
              
              if (snapshot.empty) {
                  const currentLang = document.body.classList.contains('lang-th') ? 'th' : 'en';
                  messagesList.innerHTML = `
                      <div class="message-empty">
                          ${currentLang === 'th' ? 'ยังไม่มีข้อความในขณะนี้ มาเป็นคนแรกที่ส่งข้อความกัน!' : 'No messages yet. Be the first to leave one!'}
                      </div>
                  `;
                  renderAdminMessages([], db);
                  return;
              }

              const docsList = [];
              snapshot.forEach((doc) => {
                  const data = doc.data();
                  docsList.push({ id: doc.id, ...data });
                  
                  const name = data.name || "Anonymous";
                  const message = data.message || "";
                  
                  // จัดการเรื่องเวลา
                  let timeStr = "";
                  if (data.timestamp) {
                      const date = data.timestamp.toDate();
                      timeStr = date.toLocaleDateString('th-TH', {
                          hour: '2-digit',
                          minute: '2-digit'
                      });
                  }

                  const msgCard = document.createElement('div');
                  msgCard.className = 'message-card';
                  msgCard.innerHTML = `
                      <div class="message-header">
                          <span class="message-name">${escapeHTML(name)}</span>
                          <span class="message-time">${timeStr}</span>
                      </div>
                      <p class="message-body">${escapeHTML(message)}</p>
                  `;
                  messagesList.appendChild(msgCard);
              });

              renderAdminMessages(docsList, db);
          }, (error) => {
              console.error("Error reading guestbook: ", error);
              messagesList.innerHTML = `<div class="message-empty">Error loading messages. Please check security rules.</div>`;
          });

        // 2. บันทึกข้อความเมื่อกดส่งฟอร์ม
        if (guestbookForm) {
            guestbookForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const nameInput = document.getElementById('guest-name');
                const messageInput = document.getElementById('guest-message');
                const submitBtn = document.getElementById('guestbook-submit-btn');

                const name = nameInput.value.trim();
                const message = messageInput.value.trim();

                if (name && message) {
                    // ปิดปุ่มชั่วคราวเพื่อกันกดซ้ำ
                    submitBtn.disabled = true;
                    
                    db.collection("guestbook").add({
                        name: name,
                        message: message,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    })
                    .then(() => {
                        // เคลียร์ฟอร์ม
                        nameInput.value = "";
                        messageInput.value = "";
                        submitBtn.disabled = false;
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                        alert("Error saving message: " + error.message);
                        submitBtn.disabled = false;
                    });
                }
            });
        }
    } else {
        // หากยังไม่ได้เซ็ต Firebase Config ให้จำลองตัวอย่างข้อความให้ดูสวยงาม
        function renderMockMode() {
            if (!messagesList) return;
            messagesList.innerHTML = "";

            if (mockMessages.length === 0) {
                const currentLang = document.body.classList.contains('lang-th') ? 'th' : 'en';
                messagesList.innerHTML = `
                    <div class="message-empty">
                        ${currentLang === 'th' ? 'ยังไม่มีข้อความในขณะนี้ มาเป็นคนแรกที่ส่งข้อความกัน!' : 'No messages yet. Be the first to leave one!'}
                    </div>
                `;
                renderAdminMessages([], null);
                return;
            }

            mockMessages.forEach(msg => {
                const name = msg.name;
                const message = msg.message;
                const timeStr = msg.timestamp.toLocaleDateString('th-TH', {
                    hour: '2-digit',
                    minute: '2-digit'
                });

                const msgCard = document.createElement('div');
                msgCard.className = 'message-card';
                msgCard.innerHTML = `
                    <div class="message-header">
                        <span class="message-name">${escapeHTML(name)}</span>
                        <span class="message-time">${timeStr}</span>
                    </div>
                    <p class="message-body">${escapeHTML(message)}</p>
                `;
                messagesList.appendChild(msgCard);
            });

            renderAdminMessages(mockMessages, null);
        }

        // Run initial render for Mock Mode
        renderMockMode();

        // จัดการ Submit ฟอร์มแบบ mock
        if (guestbookForm) {
            guestbookForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const nameInput = document.getElementById('guest-name');
                const messageInput = document.getElementById('guest-message');
                const name = nameInput.value.trim();
                const message = messageInput.value.trim();

                if (name && message) {
                    // Add to mock
                    mockMessages.unshift({
                        id: "demo-" + Date.now(),
                        name: name,
                        message: message,
                        timestamp: new Date()
                    });
                    nameInput.value = "";
                    messageInput.value = "";
                    renderMockMode();
                    
                    const currentLang = document.body.classList.contains('lang-th') ? 'th' : 'en';
                    const thAlert = "เพิ่มข้อความตัวอย่างเสร็จสิ้น! (ระบบ Firebase ยังไม่ได้เชื่อมต่อ แต่ออฟไลน์จำลองการทำงานให้ดูได้ครับ)";
                    const enAlert = "Demo message added successfully! (Firebase is not connected, showing local offline demo)";
                    alert(currentLang === 'th' ? thAlert : enAlert);
                }
            });
        }
    }

    // === Admin Modal Controls ===
    const adminGearBtn = document.getElementById('admin-gear-btn');
    const adminLoginModal = document.getElementById('admin-login-modal');
    const adminManageModal = document.getElementById('admin-manage-modal');
    const adminLoginForm = document.getElementById('admin-login-form');
    const closeLoginBtn = document.getElementById('close-login-btn');
    const closeManageBtn = document.getElementById('close-manage-btn');
    const adminLogoutBtn = document.getElementById('admin-logout-btn');

    // Helper functions to open/close modals
    function openModal(modal) {
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('active'), 10);
    }

    function closeModal(modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.style.display = 'none', 300);
    }

    // Toggle Gear Button
    if (adminGearBtn) {
        adminGearBtn.addEventListener('click', () => {
            if (sessionStorage.getItem('isAdmin') === 'true') {
                openModal(adminManageModal);
            } else {
                openModal(adminLoginModal);
            }
        });
    }

    // Close Login Modal
    if (closeLoginBtn) {
        closeLoginBtn.addEventListener('click', () => closeModal(adminLoginModal));
    }

    // Close Manage Modal
    if (closeManageBtn) {
        closeManageBtn.addEventListener('click', () => closeModal(adminManageModal));
    }

    // Login Form Submit
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const usernameInput = document.getElementById('admin-username');
            const passwordInput = document.getElementById('admin-password');
            const currentLang = document.body.classList.contains('lang-th') ? 'th' : 'en';

            if (usernameInput.value === 'admin' && passwordInput.value === 'pakorn2549') {
                // Clear fields
                usernameInput.value = '';
                passwordInput.value = '';
                // Set state
                sessionStorage.setItem('isAdmin', 'true');
                closeModal(adminLoginModal);
                // Open management modal
                openModal(adminManageModal);
            } else {
                const failMsg = currentLang === 'th' ? 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง!' : 'Invalid username or password!';
                alert(failMsg);
            }
        });
    }

    // Logout Button
    if (adminLogoutBtn) {
        adminLogoutBtn.addEventListener('click', () => {
            sessionStorage.removeItem('isAdmin');
            closeModal(adminManageModal);
            const currentLang = document.body.classList.contains('lang-th') ? 'th' : 'en';
            alert(currentLang === 'th' ? 'ออกจากระบบผู้ดูแลแล้ว' : 'Logged out of admin mode');
        });
    }

    // Helper to render message lists inside the admin panel
    function renderAdminMessages(docsList, firestoreDb) {
        const adminMessagesList = document.getElementById('admin-messages-list');
        if (!adminMessagesList) return;

        adminMessagesList.innerHTML = "";
        
        if (docsList.length === 0) {
            const currentLang = document.body.classList.contains('lang-th') ? 'th' : 'en';
            adminMessagesList.innerHTML = `<div class="message-empty">${currentLang === 'th' ? 'ไม่มีข้อความในระบบ' : 'No messages in the database'}</div>`;
            return;
        }

        docsList.forEach(item => {
            const adminMsgCard = document.createElement('div');
            adminMsgCard.className = 'admin-message-card';
            adminMsgCard.innerHTML = `
                <div class="admin-message-info">
                    <div class="message-header" style="margin-bottom: 4px; justify-content: flex-start; gap: 10px;">
                        <span class="message-name" style="font-size:0.95rem; color:var(--accent);">${escapeHTML(item.name)}</span>
                    </div>
                    <p class="message-body" style="font-size:0.85rem; color:var(--text-gray);">${escapeHTML(item.message)}</p>
                </div>
                <button class="btn-delete-msg" data-id="${item.id}" title="Delete Message">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            adminMessagesList.appendChild(adminMsgCard);
        });

        // Add Click handlers to delete buttons
        adminMessagesList.querySelectorAll('.btn-delete-msg').forEach(btn => {
            btn.addEventListener('click', function() {
                const docId = this.getAttribute('data-id');
                const currentLang = document.body.classList.contains('lang-th') ? 'th' : 'en';
                const confirmMsg = currentLang === 'th' ? 'คุณแน่ใจหรือไม่ว่าต้องการลบข้อความนี้?' : 'Are you sure you want to delete this message?';
                
                if (confirm(confirmMsg)) {
                    if (firestoreDb) {
                        firestoreDb.collection("guestbook").doc(docId).delete()
                            .catch(err => alert("Error: " + err.message));
                    } else {
                        // Mock Delete
                        mockMessages = mockMessages.filter(msg => msg.id !== docId);
                        
                        // We must call renderMockMode() from outer scope
                        // Since we are in mock mode block, we can just trigger it
                        const messagesListElement = document.getElementById('guestbook-list');
                        messagesListElement.innerHTML = "";

                        if (mockMessages.length === 0) {
                            const innerLang = document.body.classList.contains('lang-th') ? 'th' : 'en';
                            messagesListElement.innerHTML = `
                                <div class="message-empty">
                                    ${innerLang === 'th' ? 'ยังไม่มีข้อความในขณะนี้ มาเป็นคนแรกที่ส่งข้อความกัน!' : 'No messages yet. Be the first to leave one!'}
                                </div>
                            `;
                            renderAdminMessages([], null);
                            return;
                        }

                        mockMessages.forEach(msg => {
                            const name = msg.name;
                            const message = msg.message;
                            const timeStr = msg.timestamp.toLocaleDateString('th-TH', {
                                hour: '2-digit',
                                minute: '2-digit'
                            });

                            const msgCard = document.createElement('div');
                            msgCard.className = 'message-card';
                            msgCard.innerHTML = `
                                <div class="message-header">
                                    <span class="message-name">${escapeHTML(name)}</span>
                                    <span class="message-time">${timeStr}</span>
                                </div>
                                <p class="message-body">${escapeHTML(message)}</p>
                            `;
                            messagesListElement.appendChild(msgCard);
                        });

                        renderAdminMessages(mockMessages, null);
                    }
                }
            });
        });
    }

    // ฟังก์ชันกัน XSS ในการใส่ข้อมูล
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }

    // === Project Filter Logic ===
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || category === filterValue) {
                        card.classList.remove('hide');
                        // Reset opacity/transform for filtered items to display immediately
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    } else {
                        card.classList.add('hide');
                    }
                });
            });
        });
    }
});