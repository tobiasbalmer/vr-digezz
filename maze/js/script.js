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