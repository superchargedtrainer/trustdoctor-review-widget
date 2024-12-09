<script> document.addEventListener("DOMContentLoaded", function () {
    const widgets = document.querySelectorAll('[id^="trustdoctor-widget-"]');

    widgets.forEach(widget => {
        const profileId = widget.getAttribute("data-profile-id");

        // Replace this with the actual endpoint or mock data for now
        fetch(`https://trustdoctor.io/api/get-rating?user_id=${profileId}`)
            .then(response => response.json())
            .then(data => {
                if (data.rating && data.totalReviews) {
                    const rating = parseFloat(data.rating);
                    const totalReviews = data.totalReviews;

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
                    widget.innerHTML = `<div class="trustdoctor-error">No reviews available.</div>`;
                }
            })
            .catch(error => {
                widget.innerHTML = `<div class="trustdoctor-error">Failed to load rating.</div>`;
                console.error(error);
            });
    });
});
</script>
