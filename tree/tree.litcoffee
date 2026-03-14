# File Tree: job_tracker

**Generated:** 3/15/2026, 3:19:20 AM

```
├── 📁 .github
│   └── 📁 workflows
│       └── ⚙️ ci.yml
├── 📁 app
│   ├── 📁 api
│   │   ├── 📁 auth
│   │   │   └── 📁 [...all]
│   │   │       └── 📄 route.ts
│   │   ├── 📁 upload-document
│   │   │   └── 📄 route.ts
│   │   └── 📁 user-documents
│   │       ├── 📁 delete
│   │       │   └── 📄 route.ts
│   │       ├── 📁 signed-url
│   │       │   └── 📄 route.ts
│   │       └── 📄 route.ts
│   ├── 📁 dashboard
│   │   ├── 📁 [id]
│   │   │   ├── 📁 _components
│   │   │   │   ├── 📁 _applied
│   │   │   │   │   ├── 📄 applied-data-display.tsx
│   │   │   │   │   ├── 📄 applied-panel.tsx
│   │   │   │   │   └── 📄 applied-section.tsx
│   │   │   │   ├── 📁 _interviewing
│   │   │   │   │   ├── 📁 _components
│   │   │   │   │   │   ├── 📄 date-picker-field.tsx
│   │   │   │   │   │   ├── 📄 interview-prep-panel-section.tsx
│   │   │   │   │   │   ├── 📄 list-editor.tsx
│   │   │   │   │   │   └── 📄 rating-dots.tsx
│   │   │   │   │   ├── 📄 add-interview-cta.tsx
│   │   │   │   │   ├── 📄 interview-card.tsx
│   │   │   │   │   ├── 📄 interview-data-display.tsx
│   │   │   │   │   ├── 📄 interview-details-sheet.tsx
│   │   │   │   │   ├── 📄 interview-prep-panel.tsx
│   │   │   │   │   └── 📄 interview-section.tsx
│   │   │   │   ├── 📁 _offer
│   │   │   │   │   ├── 📄 decision-panel.tsx
│   │   │   │   │   ├── 📄 offer-details-panel.tsx
│   │   │   │   │   ├── 📄 offer-overview-panel.tsx
│   │   │   │   │   ├── 📄 offer-section.tsx
│   │   │   │   │   └── 📄 pros-and-cons-panel.tsx
│   │   │   │   ├── 📁 _rejected
│   │   │   │   │   ├── 📄 reflection-panel.tsx
│   │   │   │   │   ├── 📄 rejection-motivation-banner.tsx
│   │   │   │   │   ├── 📄 rejection-overview-panel.tsx
│   │   │   │   │   └── 📄 rejection-section.tsx
│   │   │   │   ├── 📁 _wishlist
│   │   │   │   │   ├── 📄 wishlist-data-display.tsx
│   │   │   │   │   ├── 📄 wishlist-form.tsx
│   │   │   │   │   └── 📄 wishlist-panel.tsx
│   │   │   │   ├── 📄 footer.tsx
│   │   │   │   ├── 📄 job-details-header.tsx
│   │   │   │   ├── 📄 navbar.tsx
│   │   │   │   ├── 📄 notes-and-desc-panel.tsx
│   │   │   │   └── 📄 warning-about-editing.tsx
│   │   │   ├── 📁 _styles
│   │   │   │   └── 🎨 panel.css
│   │   │   ├── 📄 layout.tsx
│   │   │   ├── 📄 loading.tsx
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 upload
│   │   │   ├── 📁 _components
│   │   │   │   ├── 📄 default-documents-list.tsx
│   │   │   │   ├── 📄 documents-list.tsx
│   │   │   │   ├── 📄 navbar.tsx
│   │   │   │   ├── 📄 pdf-preview-sheet.tsx
│   │   │   │   ├── 📄 pie-chart-for-docs-analysis.tsx
│   │   │   │   ├── 📄 total-file-size.tsx
│   │   │   │   └── 📄 upload-client.tsx
│   │   │   ├── 📄 layout.tsx
│   │   │   ├── 📄 loading.tsx
│   │   │   └── 📄 page.tsx
│   │   ├── 📄 layout.tsx
│   │   └── 📄 page.tsx
│   ├── 📁 sign-in
│   │   └── 📄 page.tsx
│   ├── 📄 favicon.ico
│   ├── 🎨 globals.css
│   ├── 📄 layout.tsx
│   └── 📄 page.tsx
├── 📁 components
│   ├── 📁 effects
│   │   ├── 📄 spotlight-footer.tsx
│   │   └── 📄 spotlight.tsx
│   ├── 📁 ui
│   │   ├── 📄 alert-dialog.tsx
│   │   ├── 📄 alert.tsx
│   │   ├── 📄 avatar.tsx
│   │   ├── 📄 badge.tsx
│   │   ├── 📄 breadcrumb.tsx
│   │   ├── 📄 button.tsx
│   │   ├── 📄 calendar.tsx
│   │   ├── 📄 card.tsx
│   │   ├── 📄 chart.tsx
│   │   ├── 📄 collapsible.tsx
│   │   ├── 📄 dialog.tsx
│   │   ├── 📄 dropdown-menu.tsx
│   │   ├── 📄 field.tsx
│   │   ├── 📄 input-otp.tsx
│   │   ├── 📄 input.tsx
│   │   ├── 📄 label.tsx
│   │   ├── 📄 popover.tsx
│   │   ├── 📄 progress.tsx
│   │   ├── 📄 scroll-area.tsx
│   │   ├── 📄 select.tsx
│   │   ├── 📄 separator.tsx
│   │   ├── 📄 sheet.tsx
│   │   ├── 📄 skeleton.tsx
│   │   ├── 📄 sonner.tsx
│   │   ├── 📄 tabs.tsx
│   │   └── 📄 textarea.tsx
│   ├── 📄 CreateColumnDialog.tsx
│   ├── 📄 CreateJobDialog.tsx
│   ├── 📄 Features.tsx
│   ├── 📄 Footer.tsx
│   ├── 📄 Hero.tsx
│   ├── 📄 JobApplicationCard.tsx
│   ├── 📄 KanbanBoard.tsx
│   ├── 📄 KanbanBoardClient.tsx
│   ├── 📄 SignOutBtn.tsx
│   ├── 📄 SortableJobCard.tsx
│   ├── 📄 chip.tsx
│   ├── 📄 google-icon.tsx
│   ├── 📄 image-tabs.tsx
│   ├── 📄 logo.tsx
│   ├── 📄 mode-toggle.tsx
│   ├── 📄 navbar.tsx
│   ├── 📄 page-loading.tsx
│   ├── 📄 section-divider.tsx
│   ├── 📄 theme-provider.tsx
│   └── 📄 upload-docs.tsx
├── 📁 constants
│   ├── 📄 default-columns.ts
│   ├── 📄 features.ts
│   ├── 📄 limit-bytes.ts
│   └── 📄 tabs-content.ts
├── 📁 interface
│   ├── 📄 job-application-card.ts
│   └── 📄 kanban-board.ts
├── 📁 lib
│   ├── 📁 actions
│   │   ├── 📄 applied.ts
│   │   ├── 📄 columns.ts
│   │   ├── 📄 interviewing.ts
│   │   ├── 📄 job-applications.ts
│   │   ├── 📄 offer.ts
│   │   ├── 📄 rejected.ts
│   │   └── 📄 wishlist.ts
│   ├── 📁 auth
│   │   ├── 📄 auth-client.ts
│   │   └── 📄 auth.ts
│   ├── 📁 documents
│   │   ├── 📄 get-user-documents.ts
│   │   └── 📄 set-unset-default-cv-cover-letter.ts
│   ├── 📁 helper
│   │   ├── 📄 formatDate.ts
│   │   ├── 📄 getTotalFileSize.ts
│   │   ├── 📄 normalizeDates.ts
│   │   └── 📄 normalizeUrl.ts
│   ├── 📁 hooks
│   │   ├── 📄 useBoard.ts
│   │   └── 📄 useDocumentsList.ts
│   ├── 📁 models
│   │   ├── 📄 board.ts
│   │   ├── 📄 column.ts
│   │   ├── 📄 index.ts
│   │   ├── 📄 job-application.ts
│   │   ├── 📄 models.types.ts
│   │   └── 📄 user-documents.ts
│   ├── 📁 supabase
│   │   ├── 📁 actions
│   │   │   └── 📄 upload-cv.ts
│   │   └── 📄 supabase-admin.ts
│   ├── 📄 db.ts
│   ├── 📄 init-user-board.ts
│   └── 📄 utils.ts
├── 📁 public
│   ├── 📁 favicon
│   │   ├── 🖼️ apple-touch-icon.png
│   │   ├── 🖼️ favicon-96x96.png
│   │   ├── 📄 favicon.ico
│   │   ├── 🖼️ favicon.svg
│   │   ├── 📄 site.webmanifest
│   │   ├── 🖼️ web-app-manifest-192x192.png
│   │   └── 🖼️ web-app-manifest-512x512.png
│   ├── 📁 hero-images
│   │   ├── 🖼️ hero1-dark.png
│   │   ├── 🖼️ hero1-light.png
│   │   ├── 🖼️ hero2-dark.png
│   │   ├── 🖼️ hero2-light.png
│   │   ├── 🖼️ hero3-dark.png
│   │   └── 🖼️ hero3-light.png
│   ├── 📁 images
│   │   ├── 🖼️ ascendio-glowing-cropped.png
│   │   └── 🖼️ pdf.png
│   ├── 📁 svgs
│   │   └── 🖼️ pdf-svgrepo-com.svg
│   ├── 🖼️ file.svg
│   ├── 🖼️ globe.svg
│   ├── 🖼️ next.svg
│   ├── 🖼️ vercel.svg
│   └── 🖼️ window.svg
├── 📁 scripts
│   ├── 📄 migrate-jobs.ts
│   ├── 📄 seed.ts
│   └── 📄 test-email.ts
├── 📁 templates
│   └── 📄 job-tracker-email-verify-template.tsx
├── 📁 tests
│   ├── 📁 e2e
│   ├── 📁 unit
│   │   └── 📁 root
│   │       ├── 📄 features.test.tsx
│   │       ├── 📄 footer.test.tsx
│   │       └── 📄 hero.test.tsx
│   ├── 📄 db-connection.test.js
│   └── 📄 example.spec.ts
├── 📁 tree
├── 📁 types
│   ├── 📄 column-data.ts
│   ├── 📄 default-columns.ts
│   ├── 📄 form-data.ts
│   ├── 📄 tabs-content.ts
│   ├── 📄 user-documents.ts
│   └── 📄 wishlist.ts
├── ⚙️ .gitignore
├── 📄 LICENSE
├── 📝 README.md
├── ⚙️ components.json
├── 📄 eslint.config.mjs
├── 📄 next.config.ts
├── ⚙️ package-lock.json
├── ⚙️ package.json
├── 📄 playwright.config.ts
├── 📄 postcss.config.mjs
├── 📄 proxy.ts
├── ⚙️ tsconfig.json
├── 📄 vitest.config.mts
└── 📄 vitest.setup.ts
```

---

_Generated by FileTree Pro Extension_
