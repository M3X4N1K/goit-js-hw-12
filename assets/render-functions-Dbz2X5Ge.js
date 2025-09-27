import{S as d}from"./vendor-Dr0KmOfh.js";const s=document.querySelector(".gallery"),a=document.querySelector(".load-more"),n=document.querySelector(".loader"),o=document.querySelector(".end-message"),l=new d(".gallery a",{captionsData:"alt",captionDelay:250});function r(i){const t=i.map(e=>`
            <li class="gallery-item">
                <a class="gallery-link" href="${e.largeImageURL}">
                    <img
                        class="gallery-image"
                        src="${e.webformatURL}"
                        alt="${e.tags}"
                        loading="lazy"
                    />
                </a>
                <div class="info">
                    <p class="info-item">
                        <b>Likes</b>
                        <span>${e.likes}</span>
                    </p>
                    <p class="info-item">
                        <b>Views</b>
                        <span>${e.views}</span>
                    </p>
                    <p class="info-item">
                        <b>Comments</b>
                        <span>${e.comments}</span>
                    </p>
                    <p class="info-item">
                        <b>Downloads</b>
                        <span>${e.downloads}</span>
                    </p>
                </div>
            </li>
        `).join("");s.insertAdjacentHTML("beforeend",t),l.refresh()}function p(){s.innerHTML="",l.refresh()}function m(){n.classList.remove("is-hidden")}function f(){n.classList.add("is-hidden")}function u(){a.classList.remove("is-hidden")}function h(){a.classList.add("is-hidden")}function L(){o.classList.remove("is-hidden")}function y(){o.classList.add("is-hidden")}export{y as a,f as b,p as c,r as d,L as e,u as f,h,m as s};
//# sourceMappingURL=render-functions-Dbz2X5Ge.js.map
