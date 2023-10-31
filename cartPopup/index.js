let popDown = document.querySelector(".popup-close-1")
popDown.addEventListener("click", () => {
    document.querySelector(".project-main-box").remove()
})

let single_data = [
    {
        avatar: "https://dev.personalization.attryb.com/template-assets/placeholder_image.svg",
        title: "Shopify product 1",
        price: "$99.99"
    }
];

let double_data = [
    {
        avatar: "https://dev.personalization.attryb.com/template-assets/placeholder_image.svg",
        title: "Shopify product 1",
        price: "$99.99"
    },
    {
        avatar: "https://dev.personalization.attryb.com/template-assets/placeholder_image.svg",
        title: "Shopify product 2",
        price: "$79.09"
    }
]

let multi_data = [
    {
        avatar: "https://dev.personalization.attryb.com/template-assets/placeholder_image.svg",
        title: "Shopify product 1",
        price: "$99.99"
    },
    {
        avatar: "https://dev.personalization.attryb.com/template-assets/placeholder_image.svg",
        title: "Shopify product 2",
        price: "$79.09"
    },
    {
        avatar: "https://dev.personalization.attryb.com/template-assets/placeholder_image.svg",
        title: "Shopify product 3",
        price: "$49.99"
    },
    {
        avatar: "https://dev.personalization.attryb.com/template-assets/placeholder_image.svg",
        title: "Shopify product 4",
        price: "$70.09"
    },
    {
        avatar: "https://dev.personalization.attryb.com/template-assets/placeholder_image.svg",
        title: "Shopify product 5",
        price: "$234.99"
    },
    {
        avatar: "https://dev.personalization.attryb.com/template-assets/placeholder_image.svg",
        title: "Shopify product 6",
        price: "$170.09"
    },
]

function sampleTemplate(product_data){
    return `
    <div class="product-data-box-1">
        <div class="avatar-container">
            <img src=${product_data.avatar} alt="avatar">
        </div>
        <div class="product-details">
            <p class="product-title">${product_data.title}</p>
            <p class="product-price">${product_data.price}</p>
        </div>
    </div>`
}

let crusol_button = `
<div class="left-butn-chv chevron">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="chevron-right">
        <path id="Icon" d="M10 12L6 8L10 4" stroke="#98A2B3" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
    </svg>
</div>
<div class="right-butn-chv chevron">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="chevron-right">
        <path id="Icon" d="M10 12L6 8L10 4" stroke="#98A2B3" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
    </svg>
</div>
`

function product_fetch(data) {

    let product_box = document.querySelector(".product-datas")
    let scroll_handler = document.querySelector(".scroll-handler")
    product_box.innerHTML = null;

    if (data.length === 1) {
        product_box.style.justifyContent = "center";
        product_box.innerHTML = sampleTemplate(data[0])
    } else if (data.length === 2) {
        let render_data = data.map((ele) => {
            return sampleTemplate(ele)
        })
        product_box.innerHTML = render_data.join("")

    } else if (data.length > 2) {
        let render_data = data.map((ele) => {
            return sampleTemplate(ele)
        })

        product_box.innerHTML = render_data.join("")
        scroll_handler.innerHTML = crusol_button;
    }
}
product_fetch(multi_data)

//scroller function
function scroller(reduce_width) {
    let scroll_content = document.querySelector(".product-datas")
    let left_scroll = document.querySelector(".left-butn-chv")
    let right_scroll = document.querySelector(".right-butn-chv")

    left_scroll.addEventListener("click", () => {
        let scroll_for_left = scroll_content.scrollLeft - reduce_width;
        scroll_content.scrollLeft = scroll_for_left >= 0 ? scroll_for_left : 0;
    })

    right_scroll.addEventListener("click", () => {
        let scroll_for_left = scroll_content.scrollLeft + reduce_width;
        scroll_content.scrollLeft = scroll_for_left;
    })
}

function handel_media_query_for_tablet(event) {
    const isWithinRange = event.matches;

    if (isWithinRange) {
        scroller(238)
    } else {
        scroller(278)
    }
}

let tablet_media = window.matchMedia("(min-width: 768px) and (max-width: 1024px)");
tablet_media.addListener(handel_media_query_for_tablet);
handel_media_query_for_tablet(tablet_media);

function handel_media_mobile(event) {
    const isWithinRange = event.matches;

    if (isWithinRange) {
        scroller(248)
    }
}

let mobile_media = window.matchMedia("(max-width: 769px)");
mobile_media.addListener(handel_media_mobile)
handel_media_mobile(mobile_media)

//hamburgre
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")
const mainBox = document.querySelector(".project-main-box")

    let count = 0;
    hamburger.addEventListener("click",()=>{
        count++;
        if(count%2 !== 0){
            mainBox.style.marginTop = "150px"
        }else{
            mainBox.style.marginTop = "0px"
        }
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    })

    document.querySelectorAll(".nav-link").forEach(ele => 
        ele.addEventListener("click", ()=>{
            mainBox.style.marginTop = "0px"
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        })
    )

// // ------------Convert DOM element to String---------------------
function convertDomToString(domObject) {
    if (domObject) {
      const serializer = new XMLSerializer();
      const htmlString = serializer.serializeToString(domObject);
      return htmlString;
    }
  }
//   // --------------------------------------------------------------


  function replacePlaceholders(targetProductArray, template) {
    const regex = /\${{(.*?)}}/g;
    const replacedStrings = targetProductArray.map((item) => {
      return template.replace(regex, (match, key) => {
        if (item.hasOwnProperty(key)) {
          return item[key];
        }
        return match;
      });
    });
    return replacedStrings.join(`${convertDomToString(attrybFBTCardDivider)}`);
  }