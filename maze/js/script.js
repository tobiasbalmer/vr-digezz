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
        var _this = this;
        this.speed = 0.8;
        this.isMoving = false;
        this.velocityDelta = new THREE.Vector3();
        
        this.el.addEventListener('triggered', function () {
            setTimeout(function () {
                _this.isMoving = true;                
            }, 2000)
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