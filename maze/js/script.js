AFRAME.registerComponent('trigger-others', {
    schema: { 
        target: {
            type: 'selectorAll'
        },
        trigger: {
            type: 'string',
            default: 'triggered' 
        }       
    },
    init: function () {
                
        var el = this.el,
            data = this.data,
            blocks = data.target; 
                
        el.addEventListener('mouseenter', function () {
            for (var i = 0; i < blocks.length; i++) {
                blocks[i].emit(data.trigger);
            }
        });
    }
});