        //gestion du popup
        const toggleBtn = document.getElementById('toggleBtn');
        const toggleBtn_con = document.getElementById('toggleBtn_con');
        const popupOverlay = document.querySelector('.form');
        const popupOverlay_con = document.querySelector('.con');
        const overlay = document.querySelector('.overlay');
        overlay.style.display= 'none';
        popupOverlay.style.display= 'none';
        popupOverlay_con.style.display= 'none';
        toggleBtn.addEventListener('click', function () {
                if (popupOverlay.style.display === 'flex') {
                   popupOverlay.style.display = 'none';
                    overlay.style.display= 'none';
                      document.body.style.overflow = 'scroll';
                } else {
                    popupOverlay.style.display = 'flex';
                    popupOverlay_con.style.display = 'none';
                    overlay.style.display= 'flex';
                    document.body.style.overflow = 'hidden';
                    
                }
            });
        toggleBtn_con.addEventListener('click', function () {
                if (popupOverlay_con.style.display === 'flex') {
                   popupOverlay_con.style.display = 'none';
                    overlay.style.display= 'none';
                      document.body.style.overflow = 'scroll';
                } else {
                    popupOverlay_con.style.display = 'flex';
                    popupOverlay.style.display = 'none';
                    overlay.style.display= 'flex';
                    document.body.style.overflow = 'hidden';
                    
                }
            });
       
            overlay.addEventListener('click', function (){
             popupOverlay.style.display = 'none';
             popupOverlay_con.style.display = 'none';
                    overlay.style.display= 'none';
                      document.body.style.overflow = 'scroll';
         });
       