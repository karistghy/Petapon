"use client";

import { useEffect, useMemo, useState } from "react";

type Submission = {
  id: string;
  name: string;
  caption: string;
  image: string;
  createdAt: number;
};

const STORAGE_KEY = "petapon-submissions";
const PULLS_KEY = "petapon-pulls";

export default function Home() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [name, setName] = useState("");
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [pull, setPull] = useState<Submission | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        setSubmissions(JSON.parse(saved));
      } catch {
        setSubmissions([]);
      }
    } else {
      setSubmissions([]);
    }
  }, []);

  const save = (next: Submission[]) => {
    setSubmissions(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const preview = useMemo(() => image, [image]);

  function handleImage(file: File | undefined) {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Please choose an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage("Keep images under 5 MB for this prototype.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setImage(String(reader.result));
      setMessage("");
    };

    reader.readAsDataURL(file);
  }

  function contribute() {
    if (!image || !name.trim()) {
      setMessage("Add a photo and give your capsule a name first!");
      return;
    }

    const item: Submission = {
      id: crypto.randomUUID(),
      name: name.trim(),
      caption: caption.trim() || "No caption. Just vibes. ✨",
      image,
      createdAt: Date.now(),
    };

    save([...submissions, item]);

    setName("");
    setCaption("");
    setImage("");

    setMessage("Your capsule is in the machine! 🎟️");
  }

  async function spin() {
    if (submissions.length < 2) {
      setMessage(
        "The machine needs at least two capsules to make a fair pull."
      );
      return;
    }

    setIsSpinning(true);
    setPull(null);
    setMessage("");

    await new Promise((resolve) => setTimeout(resolve, 1600));

    const currentPulls = JSON.parse(
      localStorage.getItem(PULLS_KEY) || "[]"
    ) as string[];

    const last = currentPulls[currentPulls.length - 1];

    const candidates = submissions.filter(
      (item) => item.id !== last
    );

    const prize =
      candidates[Math.floor(Math.random() * candidates.length)];

    if (!prize) {
      setIsSpinning(false);
      setMessage("The machine needs more capsules!");
      return;
    }

    setPull(prize);

    localStorage.setItem(
      PULLS_KEY,
      JSON.stringify([...currentPulls, prize.id])
    );

    setIsSpinning(false);
  }

  return (
    <main className="page-shell">
      <div className="retro-site">

        {/* HEADER */}

        <header className="site-header">
          <span className="deco deco-one">✦</span>
          <span className="deco deco-two">✿</span>
          <span className="deco deco-three">♡</span>

          <div className="header-inner">
            <div className="mini-label">
              ♡ WELCOME TO ♡
            </div>

            <h1>
              PETAPON <span>🎀</span>
            </h1>

            <p>
              community gachapon &amp; tiny bits of joy
            </p>
          </div>
        </header>

        {/* NAVIGATION */}

        <nav className="retro-nav">
          <a href="#home">home</a>
          <a href="#gacha">gachapon</a>
          <a href="#contribute">contribute</a>
          <a href="#collection">collection</a>
          <a href="#about">about</a>
        </nav>

        <div className="site-notice">
          ✿ ✧ ✿{" "}
          <strong>
            THE INTERNET'S TINIEST PRIZE MACHINE
          </strong>{" "}
          ✿ ✧ ✿
        </div>

        {/* MAIN */}

        <div className="retro-main" id="home">

          {/* SIDEBAR */}

          <aside className="sidebar">

            <div className="retro-box">
              <div className="box-heading">
                ♡ petapon info
              </div>

              <div className="box-content intro-box">

                <div className="mini-sticker">
                  PETAPON
                  <br />
                  ♡ かわいい ♡
                </div>

                <p>
                  Welcome to my little corner of
                  the internet!
                </p>

                <p>
                  Put something cute in the machine,
                  then pull a surprise from somebody
                  else.
                </p>

                <div className="tiny-links">
                  <span>✿ cute</span>
                  <span>✿ random</span>
                  <span>✿ free</span>
                </div>

              </div>
            </div>


            <div className="retro-box">

              <div className="box-heading pink-heading">
                ♡ update log
              </div>

              <div className="box-content">

                <ul className="updates">

                  <li>
                    <b>08.10</b> new capsules!
                  </li>

                  <li>
                    <b>08.05</b> machine opened ♡
                  </li>

                  <li>
                    <b>07.30</b> welcome to Petapon!
                  </li>

                </ul>

              </div>

            </div>


            <div className="retro-box">

              <div className="box-heading blue-heading">
                ✿ site links
              </div>

              <div className="box-content side-links">

                <a href="#gacha">
                  → try the machine
                </a>

                <a href="#contribute">
                  → add a capsule
                </a>

                <a href="#collection">
                  → latest pulls
                </a>

                <a href="#about">
                  → about petapon
                </a>

              </div>

            </div>


            <div className="counter-box">

              <span>CAPSULES</span>

              <strong>
                {String(submissions.length).padStart(4, "0")}
              </strong>

            </div>

          </aside>


          {/* MAIN CONTENT */}

          <section className="main-column">

            {/* WELCOME */}

            <div className="retro-box welcome-box">

              <div className="box-heading">
                ✿ welcome to petapon! ✿
              </div>

              <div className="box-content">

                <h2>
                  Give a little.
                  <br />

                  <span>
                    Get something random. ♡
                  </span>
                </h2>

                <p className="welcome-copy">
                  Upload a photo, name your tiny
                  treasure, and toss it into the
                  community machine.

                  Then pull a mystery capsule
                  contributed by somebody else!
                </p>

                <div className="stats-row">

                  <div>
                    <b>{submissions.length}</b>
                    <small>capsules</small>
                  </div>

                  <div>
                    <b>∞</b>
                    <small>surprises</small>
                  </div>

                  <div>
                    <b>♡</b>
                    <small>good vibes</small>
                  </div>

                </div>

              </div>

            </div>


            {/* GACHAPON */}

            <div
              className="retro-box pink-box"
              id="gacha"
            >

              <div className="box-heading pink-heading">
                ♡ today's gachapon ♡
              </div>

              <div className="box-content">

                <div className="gacha-panel">

                  <div className="machine-wrap">

                    <div className="machine">

                      <div className="machine-sign">
                        ✦ PETAPON ✦
                      </div>

                      <div className="machine-glass">

                        <div
                          className={`capsules ${
                            isSpinning
                              ? "capsule-spin"
                              : ""
                          }`}
                        >

                          <i className="c1">●</i>
                          <i className="c2">●</i>
                          <i className="c3">●</i>
                          <i className="c4">●</i>
                          <i className="c5">●</i>
                          <i className="c6">●</i>

                        </div>

                        {isSpinning && (
                          <div className="mixing">
                            MIXING... ✿
                          </div>
                        )}

                      </div>

                      <div className="machine-base">

                        <div className="slot">
                          ♡
                        </div>

                        <button
                          onClick={spin}
                          disabled={isSpinning}
                        >
                          {isSpinning
                            ? "SPINNING..."
                            : "✿ SPIN THE MACHINE ✿"}
                        </button>

                      </div>

                    </div>

                  </div>


                  <div className="gacha-copy">

                    <span className="tiny-label">
                      MYSTERY CAPSULE
                    </span>

                    <h3>
                      What will you get?
                    </h3>

                    <p>
                      Every pull is a surprise
                      from another little corner
                      of the Petapon community.
                    </p>

                    <div className="rarities">
                      <span>★ common</span>
                      <span>★★ cute</span>
                      <span>★★★ rare</span>
                    </div>

                    {message && (
                      <p className="message">
                        {message}
                      </p>
                    )}

                  </div>

                </div>

              </div>

            </div>


            {/* PULL RESULT */}

            {pull && (

              <div className="retro-box reveal-box">

                <div className="box-heading blue-heading">
                  ✧ your capsule! ✧
                </div>

                <div className="box-content">

                  <div className="prize-card">

                    <img
                      src={pull.image}
                      alt={pull.name}
                    />

                    <div className="prize-info">

                      <span className="tiny-label">
                        MYSTERY PULL ♡
                      </span>

                      <h3>
                        {pull.name}
                      </h3>

                      <p>
                        “{pull.caption}”
                      </p>

                      <small>
                        Contributed by another player ✿
                      </small>

                      <button
                        className="again"
                        onClick={spin}
                      >
                        pull again ♡
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            )}


            {/* CONTRIBUTE */}

            <div
              className="retro-box"
              id="contribute"
            >

              <div className="box-heading">
                ✿ put something in the machine ✿
              </div>

              <div className="box-content">

                <div className="upload-grid">

                  <label className="dropzone">

                    {preview ? (

                      <img
                        src={preview}
                        alt="Your upload preview"
                      />

                    ) : (

                      <>
                        <span className="plus">
                          ＋
                        </span>

                        <strong>
                          drop a cute photo here
                        </strong>

                        <small>
                          JPG, PNG, or WebP · max 5 MB
                        </small>
                      </>

                    )}

                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={(e) =>
                        handleImage(
                          e.target.files?.[0]
                        )
                      }
                    />

                  </label>


                  <div className="retro-form">

                    <label>
                      Name

                      <input
                        value={name}
                        onChange={(e) =>
                          setName(e.target.value)
                        }
                        placeholder="e.g. Sir Waffles"
                        maxLength={40}
                      />

                    </label>


                    <label>
                      Caption

                      <textarea
                        value={caption}
                        onChange={(e) =>
                          setCaption(e.target.value)
                        }
                        placeholder="Tell us about your little guy..."
                        maxLength={140}
                        rows={4}
                      />

                    </label>


                    <button
                      className="contribute"
                      onClick={contribute}
                    >
                      ♡ add my capsule ♡
                    </button>


                    {message && (
                      <p className="message">
                        {message}
                      </p>
                    )}

                  </div>

                </div>

              </div>

            </div>


            {/* COLLECTION */}

            <div
              className="retro-box"
              id="collection"
            >

              <div className="box-heading pink-heading">
                ♡ latest capsules ♡
              </div>

              <div className="box-content">

                {submissions.length === 0 ? (

                  <div
                    style={{
                      textAlign: "center",
                      padding: "25px 10px",
                      color: "#9b8880",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "30px",
                        color: "#df9db3",
                      }}
                    >
                      ♡
                    </div>

                    <strong>
                      The collection is empty!
                    </strong>

                    <br />

                    <small>
                      Be the first person to put
                      a capsule in the machine. ✿
                    </small>
                  </div>

                ) : (

                  <div className="gallery">

                    {submissions
                      .slice(-6)
                      .reverse()
                      .map((item) => (

                        <div
                          className="gallery-item"
                          key={item.id}
                        >

                          <img
                            src={item.image}
                            alt={item.name}
                          />

                          <div>

                            <b>
                              {item.name}
                            </b>

                            <small>
                              {item.caption}
                            </small>

                          </div>

                        </div>

                      ))}

                  </div>

                )}

              </div>

            </div>


            {/* ABOUT */}

            <div
              className="retro-box"
              id="about"
            >

              <div className="box-heading blue-heading">
                ♡ about petapon ♡
              </div>

              <div className="box-content about-box">

                <p>
                  Petapon is a tiny community
                  gachapon made from everyone's
                  tiny bits of joy.
                </p>

                <p>
                  No coins. No prizes to buy.
                  Just photos, surprises, and a
                  little bit of internet magic. ✧
                </p>

                <div className="divider">
                  ✿ ｡･:*˚:✧｡ ✿ ｡･:*˚:✧｡ ✿
                </div>

                <span className="badge pink">
                  cute
                </span>

                <span className="badge yellow">
                  gachapon
                </span>

                <span className="badge blue">
                  community
                </span>

              </div>

            </div>

          </section>

        </div>


        {/* FOOTER */}

        <footer className="retro-footer">

          <div>
            ♡ ✿ ♡ ✿ ♡
          </div>

          <strong>
            PETAPON 🎀
          </strong>

          <span>
            made from everyone's tiny bits of joy
          </span>

          <small>
            best viewed with lots of sparkles ✧
          </small>

        </footer>

      </div>
    </main>
  );
}