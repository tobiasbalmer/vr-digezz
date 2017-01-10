AFRAME.registerComponent('trigger-others', {
    schema: {
        target: {
            type: 'selectorAll'
        },
        trigger: {
            type: 'string',
            default: 'triggered'
        },
        repeatable: {
            type: 'boolean',
            default: false
        }
    },
    init: function () {

        var el = this.el,
            data = this.data,
            blocks = data.target,
            counter = 0;  
                
        el.addEventListener('click', function () {            
            if (counter === 0) {
                for (var i = 0; i < blocks.length; i++) {
                    blocks[i].emit(data.trigger);
                }
                if (!data.repeatable) counter++;
            }

        });
    }
});

AFRAME.registerComponent('automove-controls', {    
    init: function () {
        var _this = this,
            vrScene = document.querySelector('a-scene'),
            vrLight = document.querySelectorAll('.light'),
            ground = document.getElementById('ground-plane'),
            sky = document.querySelector('a-sky');
        
        this.speed = 1.2;
        this.isMoving = false;
        this.velocityDelta = new THREE.Vector3();
                
        this.el.addEventListener('kickstart', function () {
            setTimeout(function () {
                _this.isMoving = true;                
            }, 4000)
        }); 
        
        this.el.addEventListener('switch', function () {
            _this.speed = 0;            
            ground.setAttribute('material', 'src', '#grass-pattern');
            sky.setAttribute('material', 'src', '#nature-bg');
            vrScene.setAttribute('fog', {'type': 'exponential', 'color': '#f0f0f0', 'density': 0.019});
            
            setTimeout(function () {
                for (var i = 0; i < vrLight.length; i++) {
                    vrLight[i].emit('down');
                }
            }, 15000);
        });         
    },
    isVelocityActive: function () {
        return this.isMoving;
    },
    getVelocityDelta: function () {
        this.velocityDelta.z = this.isMoving ? -this.speed : 0;
        return this.velocityDelta.clone();
    }
});