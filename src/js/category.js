function removeAllOptions(select) {
    var selectElement = document.getElementById(select);
    while (selectElement.options.length > 1) {
        selectElement.remove(1);
    }
}

// Show Category
function category(){
    cat = document.getElementById('type').value
    dataTag = {
        'blush': ['vegan', 'gluten free', 'canadian', 'natural', 'non-gmo', 'purpicks', 'usda organic', 'organic', 'certclean', 'ewg verified', 'hypoallergenic', 'no talc'],
        'bronzer': ['gluten free', 'canadian', 'natural', 'organic', 'vegan', 'purpicks', 'ewg verified'],
        'eyebrow': ['ewg verified', 'purpicks'],
        'eyeliner': ['vegan', 'natural', 'canadian', 'gluten free', 'organic', 'purpicks', 'certclean', 'ewg verified', 'hypoallergenic', 'no talc', 'ecocert'],
        'eyeshadow': ['vegan', 'canadian', 'natural', 'gluten free', 'non-gmo', 'purpicks', 'certclean', 'EWG Verified', 'organic', 'usda organic', 'hypoallergenic', 'no talc', 'ecocert'],
        'foundation': ['vegan', 'canadian', 'natural', 'gluten free', 'purpicks', 'certclean', 'ewg verified', 'hypoallergenic', 'no talc', 'water free', 'cruelty free', 'alcohol free', 'oil free', 'silicone free'],
        'lip_liner': ['natural', 'vegan', 'gluten free', 'canadian', 'purpicks', 'ewg verified', 'hypoallergenic', 'no talc', 'cruelty free'],
        'lipstick': ['canadian', 'natural', 'gluten free', 'non-gmo', 'peanut free product', 'vegan', 'cruelty free', 'organic', 'purpicks', 'certclean', 'chemical free', 'ewg verified', 'hypoallergenic', 'no talc'],
        'mascara': ['natural', 'gluten free', 'vegan', 'canadian', 'organic', 'purpicks', 'ewg verified', 'hypoallergenic', 'no talc', 'ecocert', 'usda organic', 'certclean'],
        'nail_polish': ['vegan', 'canadian', 'natural', 'gluten free', 'fair trade', 'sugar free', 'non-gmo', 'dairy free']
    }

    dataCat = {
        'blush' : ['powder', 'cream'],
        'bronzer' : ['powder'],
        'eyebrow' : ['pencil'],
        'eyeliner' : ['liquid','pencil','gel','cream'],
        'eyeshadow' : ['pallete', 'pencil', 'cream'],
        'foundation' : ['concealer', 'liquid', 'contour', 'bb_cc', 'cream', 'mineral', 'powder', 'highlighter'],
        'lip_liner' : ['pencil'],
        'lipstick' : ['lipstick', 'lip_gloss', 'liquid', 'lip_stain'],
        'mascara' : [],
        'nail_polish' : []
    }
    removeAllOptions('tag')
    removeAllOptions('category')

    for(const element of dataTag[cat]){
        
        const select = document.getElementById("tag");
        const option = document.createElement("option");
        option.value = element;
        option.text = element;
        select.appendChild(option);
    }
    
    for(const element of dataCat[cat]){
        const select = document.getElementById("category");
        const option = document.createElement("option");
        option.value = element;
        option.text = element;
        select.appendChild(option);
    }
}
