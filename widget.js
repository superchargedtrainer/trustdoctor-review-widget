<script> 
document.addEventListener("DOMContentLoaded", function () {
    const widgets = document.querySelectorAll('[id^="trustdoctor-widget-"]');

    // Add CSS dynamically
    const style = document.createElement("style");
    style.innerHTML = `
        .trustdoctor-rating .stars {
            color: #FFD700; /* Gold stars */
            font-size: 1.5em;
            margin-bottom: 10px;
        }
        .trustdoctor-rating .rating-text {
            font-size: 1em;
            color: #333;
            margin-bottom: 20px;
        }
        .trustdoctor-rating {
            font-family: Arial, sans-serif;
            border: 1px solid #ddd;
            border-radius: 5px;
            padding: 15px;
            background-color: #f9f9f9;
            width: fit-content;
            margin: auto;
        }
        .trustdoctor-error {
            color: red;
            font-size: 1em;
        }
    `;
    document.head.appendChild(style);

    // Render the widget
    widgets.forEach(widget => {
        const rating = parseFloat(widget.getAttribute("data-rating"));
        const totalReviews = parseInt(widget.getAttribute("data-total-reviews"));

        if (rating && totalReviews) {
            let fullStars = Math.floor(rating);
            let halfStar = (rating - fullStars) >= 0.5 ? 1 : 0;
            let emptyStars = 5 - (fullStars + halfStar);

            let starsHTML = "";

            for (let i = 0; i < fullStars; i++) starsHTML += '<i class="fa fa-star"></i>';
            if (halfStar) starsHTML += '<i class="fa fa-star-half-o"></i>';
            for (let i = 0; i < emptyStars; i++) starsHTML += '<i class="fa fa-star-o"></i>';

            widget.innerHTML = `
                <div class="trustdoctor-rating">
                    <div class="stars">${starsHTML}</div>
                    <div class="rating-text">${rating.toFixed(1)}/5 (${totalReviews} Reviews)</div>
                </div>
            `;
        } else {
            widget.innerHTML = `<div class="trustdoctor-error">Failed to load rating data.</div>`;
        }
    });
});

</script>
