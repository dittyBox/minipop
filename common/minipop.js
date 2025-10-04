class minipop {
    constructor(parent, x, y, content = '팝업 내용') {
      this.parent = parent;
      this.popup = document.createElement('div');
      this.popup.className = 'popup';
  
      this.popup.innerHTML = `
        <div class="popup-header">
          <span>팝업</span>
          <span class="popup-close">×</span>
        </div>
        <div class="popup-body">${content}</div>
      `;
  
      this.header = this.popup.querySelector('.popup-header');
      this.closeBtn = this.popup.querySelector('.popup-close');
      this.parent.appendChild(this.popup);
  
      // 초기 위치 설정
      this.setInitialPosition(x, y);
  
      // 이벤트 바인딩
      this.onMouseDown = this.startDrag.bind(this);
      this.onMouseMove = this.drag.bind(this);
      this.onMouseUp = this.stopDrag.bind(this);
      this.onClose = this.destroy.bind(this);
      this.onOutsideClick = this.handleOutsideClick.bind(this);
  
      this.header.addEventListener('mousedown', this.onMouseDown);
      this.closeBtn.addEventListener('click', this.onClose);
      document.addEventListener('mousedown', this.onOutsideClick);  // 외부 클릭 감지
    }
  
    setInitialPosition(x, y) {
      const parentRect = this.parent.getBoundingClientRect();
      const popupWidth = this.popup.offsetWidth;
      const popupHeight = this.popup.offsetHeight;
  
      let left = x - parentRect.left;
      let top = y - parentRect.top;
  
      if (left + popupWidth > parentRect.width) left = left - popupWidth;
      if (top + popupHeight > parentRect.height) top = top - popupHeight;
      if (left < 0) left = 0;
      if (top < 0) top = 0;
  
      this.popup.style.left = `${left}px`;
      this.popup.style.top = `${top}px`;
    }
  
    startDrag(e) {
      e.preventDefault();
      const popupRect = this.popup.getBoundingClientRect();
      this.isDragging = true;
      this.offsetX = e.clientX - popupRect.left;
      this.offsetY = e.clientY - popupRect.top;
  
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
    }
  
    drag(e) {
      if (!this.isDragging) return;
  
      const parentRect = this.parent.getBoundingClientRect();
      const popupWidth = this.popup.offsetWidth;
      const popupHeight = this.popup.offsetHeight;
  
      let newLeft = e.clientX - parentRect.left - this.offsetX;
      let newTop = e.clientY - parentRect.top - this.offsetY;
  
      if (newLeft < 0) newLeft = 0;
      if (newTop < 0) newTop = 0;
      if (newLeft + popupWidth > parentRect.width) newLeft = parentRect.width - popupWidth;
      if (newTop + popupHeight > parentRect.height) newTop = parentRect.height - popupHeight;
  
      this.popup.style.left = `${newLeft}px`;
      this.popup.style.top = `${newTop}px`;
    }
  
    stopDrag() {
      this.isDragging = false;
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.onMouseUp);
    }
  
    handleOutsideClick(e) {
      // 팝업 내부 클릭은 무시
      if (this.popup.contains(e.target)) return;
  
      // 팝업 외부 클릭이면 소멸
      this.destroy();
    }
  
    destroy() {
      // 이벤트 해제
      this.header.removeEventListener('mousedown', this.onMouseDown);
      this.closeBtn.removeEventListener('click', this.onClose);
      document.removeEventListener('mousedown', this.onOutsideClick);
      this.stopDrag();
  
      // DOM 제거
      this.popup.remove();
    }
  }
  