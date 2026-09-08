/* ABYSS integration — adds ABYSS to Story without changing the existing Story world. */
(() => {
  'use strict';

  function mount() {
    const journey = document.querySelector('#journey .section-inner');

    if (!journey || document.getElementById('abyssStoryPortal')) return;

    const wrap = document.createElement('div');

    wrap.id = 'abyssStoryPortal';

    wrap.innerHTML = `
      <div class="abyss-story-portal">

        <div class="abyss-story-portal-kicker">
          A PIECE OF ME · DEEP WORLD
        </div>

        <div class="abyss-story-portal-title">
          ABYSS
        </div>

        <p class="abyss-story-portal-text">
          A world that pulls everything toward its center.<br>
          36 depths. Questions. Memories. Stories. One way down.
        </p>

        <div class="abyss-story-portal-meta">
          <span>36 POINTS</span>
          <span>ONE ABYSS</span>
          <span>ABYSS CONQUERED</span>
        </div>

        <a
          class="abyss-story-portal-button"
          href="abyss.html"
        >
          ENTER THE ABYSS
        </a>

      </div>
    `;

    const style = document.createElement('style');

    style.textContent = `
      #abyssStoryPortal{
        margin:42px auto 0;
        width:min(980px,94vw);
      }

      .abyss-story-portal{
        position:relative;
        overflow:hidden;
        text-align:center;
        padding:42px 28px;

        border:1px solid rgba(180,185,210,.16);
        border-radius:24px;

        background:
          radial-gradient(
            circle at 50% 45%,
            rgba(120,130,170,.12),
            transparent 36%
          ),
          linear-gradient(
            145deg,
            rgba(5,7,14,.96),
            rgba(1,2,8,.98)
          );

        box-shadow:
          0 28px 90px rgba(0,0,0,.45);
      }

      .abyss-story-portal::before{
        content:"";

        position:absolute;

        left:50%;
        top:50%;

        width:260px;
        height:260px;

        transform:translate(-50%,-50%);

        border-radius:50%;

        border:1px solid rgba(220,225,245,.08);

        box-shadow:
          0 0 80px rgba(120,130,170,.08),
          inset 0 0 80px rgba(0,0,0,.8);

        animation:
          abyssPortalPulse 4s ease-in-out infinite;

        pointer-events:none;
      }

      .abyss-story-portal-kicker,
      .abyss-story-portal-title,
      .abyss-story-portal-text,
      .abyss-story-portal-meta,
      .abyss-story-portal-button{
        position:relative;
        z-index:1;
      }

      .abyss-story-portal-kicker{
        font-size:9px;
        letter-spacing:4px;
        color:#666b79;
      }

      .abyss-story-portal-title{
        margin:12px 0 10px;

        font-size:clamp(36px,7vw,68px);
        font-weight:200;

        letter-spacing:13px;
        margin-left:13px;

        color:#eee;

        text-shadow:
          0 0 30px rgba(180,190,220,.22);
      }

      .abyss-story-portal-text{
        margin:0 auto 20px;

        max-width:600px;

        color:#888d9b;

        font-size:12px;
        line-height:1.8;
      }

      .abyss-story-portal-meta{
        display:flex;
        justify-content:center;

        gap:10px;
        flex-wrap:wrap;

        margin:20px 0;
      }

      .abyss-story-portal-meta span{
        padding:8px 11px;

        border:1px solid rgba(180,185,210,.13);

        color:#737887;

        font-size:8px;
        letter-spacing:2px;

        background:rgba(255,255,255,.015);
      }

      .abyss-story-portal-button{
        display:inline-block;

        margin-top:10px;

        padding:13px 22px;

        border:1px solid #777;

        color:#eee;

        text-decoration:none;

        font-size:9px;
        letter-spacing:3px;

        background:rgba(5,6,12,.75);

        transition:.25s;

        box-shadow:
          0 0 22px rgba(255,255,255,.03);
      }

      .abyss-story-portal-button:hover{
        border-color:#ddd;

        transform:translateY(-2px);

        box-shadow:
          0 0 30px rgba(190,200,230,.10);
      }

      @keyframes abyssPortalPulse{
        50%{
          transform:
            translate(-50%,-50%)
            scale(1.08);

          opacity:.65;
        }
      }

      @media(max-width:650px){

        #abyssStoryPortal{
          width:calc(100vw - 28px);
        }

        .abyss-story-portal{
          padding:34px 18px;
        }

        .abyss-story-portal-title{
          letter-spacing:9px;
          margin-left:9px;
        }

      }
    `;

    document.head.appendChild(style);

    journey.appendChild(wrap);
  }

  if(document.readyState === 'loading'){
    document.addEventListener(
      'DOMContentLoaded',
      mount
    );
  }else{
    mount();
  }

})();