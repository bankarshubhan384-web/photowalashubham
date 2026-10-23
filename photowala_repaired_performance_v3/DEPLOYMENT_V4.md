# Deploy PHOTOWALA SHUBHAM unified v4 update

This is a complete update combining the actual uploaded Photo Gallery, all 7 film thumbnails, the new square PWS app icon, and the performance fixes.

1. Extract the ZIP. Open the `photowala_repaired_performance_v3` folder in Terminal.
2. Keep the `functions` folder at this folder's root and `public` as the Pages output folder.
3. Deploy the whole site folder (do not upload only `index.html`):

```bash
npx wrangler login
npx wrangler pages deploy public --project-name photowalashubham
```

If your Cloudflare project has a different exact name, use that name.

## After deployment
- Visit `/` and hard-refresh once (Ctrl+Shift+R on Windows/Linux, Cmd+Shift+R on Mac).
- Scroll to Photo Gallery: it should use local `/assets/photos/*-v4.webp` assets, not old Unsplash photos.
- Scroll to More Films: all 7 cards should show their supplied image thumbnails.
- Open a portrait and landscape photo in the viewer: the complete image should fit within the viewport without clipping.
- Check the home-screen/app icon. If an old installed shortcut persists, remove it and reinstall/add to Home Screen after the new site is live.
- Test booking calendar, booking submit, customer login, and website editor. The Apps Script deployment does not need changing for this front-end update.

The files are prepared and locally checked; this chat has not published to your Cloudflare account or measured live device performance.
