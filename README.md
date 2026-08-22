# Smoke Break Cat

Smoke Break Cat is a web-first arcade runner and incremental game about a street cat surviving hazards, collecting absurd cosmetics, and clearing escalating smoke encounters.

The current public goal is fast playtesting through GitHub Pages while keeping the code, input model, save system, and asset pipeline portable to a future mobile wrapper or native port.

## Project status

**Public alpha / active production hardening.** Play the current build at **https://nckzvth.github.io/smoke-break-cat/**. The original single-file prototype is preserved in `smoke_break_cat_history_update.html`. Production work is tracked in [`docs/IMPLEMENTATION_PLAN.md`](docs/IMPLEMENTATION_PLAN.md).

## Product direction

- Public, web-first playtests on GitHub Pages.
- Desktop and mobile-browser support from the same build.
- Touch, mouse, and keyboard controls.
- Architecture that can later be wrapped with Capacitor or ported to a native engine without rewriting game rules.
- Two presentation modes sharing identical mechanics:
  - **Original Mode:** the intended cigarettes, vapes, smoke devices, names, and jokes.
  - **Little Baby Idiot Mode:** an optional candy-themed content skin for players who want it.

Switch modes from the title screen or the Cat Closet. The preference persists on the device and can be changed during a run without resetting progress.

The alternate content mode is a presentation feature, not a claim of compliance with any mobile-store policy. See [`docs/PRODUCT_DECISIONS.md`](docs/PRODUCT_DECISIONS.md).

## Local development

Requires Node.js 24 or another Vite-compatible Node release.

```sh
npm install
npm run dev
```

Before publishing changes:

```sh
npm test
npm run build
```

Pull requests run the same validation in GitHub Actions. Merges to `main` deploy the validated `dist/` artifact to GitHub Pages.

## Documentation

- [Implementation plan](docs/IMPLEMENTATION_PLAN.md)
- [Product and distribution decisions](docs/PRODUCT_DECISIONS.md)
- [Content-mode contract](docs/CONTENT_MODES.md)
- [Current production status](docs/STATUS.md)

## License

No open-source license has been granted yet. All rights are reserved by the project owner.
