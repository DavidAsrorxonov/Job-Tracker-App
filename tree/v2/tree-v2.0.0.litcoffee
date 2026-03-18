# File Tree: job_tracker

**Generated:** 3/19/2026, 12:06:36 AM

**v2.0.0**

```
├── 📁 .github
│   └── 📁 workflows
│       └── ⚙️ ci.yml
├── 📁 app
│   ├── 📁 (auth)
│   │   └── 📁 sign-in
│   │       └── 📄 page.tsx
│   ├── 📁 (main)
│   │   ├── 📁 dashboard
│   │   │   ├── 📁 [id]
│   │   │   │   ├── 📁 _components
│   │   │   │   │   ├── 📁 _applied
│   │   │   │   │   │   ├── 📄 applied-data-display.tsx
│   │   │   │   │   │   ├── 📄 applied-panel.tsx
│   │   │   │   │   │   └── 📄 applied-section.tsx
│   │   │   │   │   ├── 📁 _interviewing
│   │   │   │   │   │   ├── 📁 _components
│   │   │   │   │   │   │   ├── 📄 date-picker-field.tsx
│   │   │   │   │   │   │   ├── 📄 interview-prep-panel-section.tsx
│   │   │   │   │   │   │   ├── 📄 list-editor.tsx
│   │   │   │   │   │   │   └── 📄 rating-dots.tsx
│   │   │   │   │   │   ├── 📄 add-interview-cta.tsx
│   │   │   │   │   │   ├── 📄 interview-card.tsx
│   │   │   │   │   │   ├── 📄 interview-data-display.tsx
│   │   │   │   │   │   ├── 📄 interview-details-sheet.tsx
│   │   │   │   │   │   ├── 📄 interview-prep-panel.tsx
│   │   │   │   │   │   └── 📄 interview-section.tsx
│   │   │   │   │   ├── 📁 _offer
│   │   │   │   │   │   ├── 📄 decision-panel.tsx
│   │   │   │   │   │   ├── 📄 offer-details-panel.tsx
│   │   │   │   │   │   ├── 📄 offer-overview-panel.tsx
│   │   │   │   │   │   ├── 📄 offer-section.tsx
│   │   │   │   │   │   └── 📄 pros-and-cons-panel.tsx
│   │   │   │   │   ├── 📁 _rejected
│   │   │   │   │   │   ├── 📄 reflection-panel.tsx
│   │   │   │   │   │   ├── 📄 rejection-motivation-banner.tsx
│   │   │   │   │   │   ├── 📄 rejection-overview-panel.tsx
│   │   │   │   │   │   └── 📄 rejection-section.tsx
│   │   │   │   │   ├── 📁 _wishlist
│   │   │   │   │   │   ├── 📄 wishlist-data-display.tsx
│   │   │   │   │   │   ├── 📄 wishlist-form.tsx
│   │   │   │   │   │   └── 📄 wishlist-panel.tsx
│   │   │   │   │   ├── 📄 footer.tsx
│   │   │   │   │   ├── 📄 job-details-header.tsx
│   │   │   │   │   ├── 📄 navbar.tsx
│   │   │   │   │   ├── 📄 notes-and-desc-panel.tsx
│   │   │   │   │   └── 📄 warning-about-editing.tsx
│   │   │   │   ├── 📁 _styles
│   │   │   │   │   └── 🎨 panel.css
│   │   │   │   ├── 📁 timeline
│   │   │   │   │   ├── 📁 _components
│   │   │   │   │   │   ├── 📁 _charts
│   │   │   │   │   │   │   ├── 📄 area-chart-default.tsx
│   │   │   │   │   │   │   ├── 📄 bar-chart-default.tsx
│   │   │   │   │   │   │   ├── 📄 pie-chart-donut.tsx
│   │   │   │   │   │   │   └── 📄 radar-chart.tsx
│   │   │   │   │   │   ├── 📄 charts-wrapper.tsx
│   │   │   │   │   │   ├── 📄 day-marker.tsx
│   │   │   │   │   │   ├── 📄 entry-card.tsx
│   │   │   │   │   │   ├── 📄 navbar.tsx
│   │   │   │   │   │   ├── 📄 timeline-feed.tsx
│   │   │   │   │   │   └── 📄 timeline-stats.tsx
│   │   │   │   │   ├── 📄 layout.tsx
│   │   │   │   │   └── 📄 page.tsx
│   │   │   │   ├── 📄 layout.tsx
│   │   │   │   ├── 📄 loading.tsx
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 upload
│   │   │   │   ├── 📁 _components
│   │   │   │   │   ├── 📄 default-documents-list.tsx
│   │   │   │   │   ├── 📄 documents-list.tsx
│   │   │   │   │   ├── 📄 navbar.tsx
│   │   │   │   │   ├── 📄 pdf-preview-sheet.tsx
│   │   │   │   │   ├── 📄 pie-chart-for-docs-analysis.tsx
│   │   │   │   │   ├── 📄 total-file-size.tsx
│   │   │   │   │   └── 📄 upload-client.tsx
│   │   │   │   ├── 📄 layout.tsx
│   │   │   │   ├── 📄 loading.tsx
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📄 layout.tsx
│   │   │   └── 📄 page.tsx
│   │   ├── 📄 layout.tsx
│   │   └── 📄 page.tsx
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
│   ├── 📁 privacy
│   │   ├── 📄 layout.tsx
│   │   └── 📄 page.tsx
│   ├── 📁 terms
│   │   ├── 📄 layout.tsx
│   │   └── 📄 page.tsx
│   ├── 📄 favicon.ico
│   ├── 🎨 globals.css
│   └── 📄 layout.tsx
├── 📁 components
│   ├── 📁 effects
│   │   ├── 📄 spotlight-footer.tsx
│   │   └── 📄 spotlight.tsx
│   ├── 📁 ui
│   │   ├── 📄 accordion.tsx
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
│   ├── 📄 FAQs.tsx
│   ├── 📄 Features.tsx
│   ├── 📄 Footer.tsx
│   ├── 📄 Hero.tsx
│   ├── 📄 JobApplicationCard.tsx
│   ├── 📄 KanbanBoard.tsx
│   ├── 📄 KanbanBoardClient.tsx
│   ├── 📄 SignOutBtn.tsx
│   ├── 📄 SortableJobCard.tsx
│   ├── 📄 chip.tsx
│   ├── 📄 contact.tsx
│   ├── 📄 cta.tsx
│   ├── 📄 google-icon.tsx
│   ├── 📄 how-it-works.tsx
│   ├── 📄 image-tabs.tsx
│   ├── 📄 logo.tsx
│   ├── 📄 mode-toggle.tsx
│   ├── 📄 navbar.tsx
│   ├── 📄 page-loading.tsx
│   ├── 📄 section-divider.tsx
│   ├── 📄 theme-provider.tsx
│   └── 📄 upload-docs.tsx
├── 📁 config
│   ├── 📄 decision-panel-decision.ts
│   ├── 📄 interview-card-type.ts
│   ├── 📄 interview-data-display-type.ts
│   ├── 📄 interview-details-sheet-type.ts
│   ├── 📄 offer-overview-panel-equity.ts
│   ├── 📄 rejection-overview-panel-stage.ts
│   ├── 📄 timeline-feed.ts
│   └── 📄 wishlist-data-display-priority.ts
├── 📁 constants
│   ├── 📄 currencies.ts
│   ├── 📄 default-columns.ts
│   ├── 📄 faqs.ts
│   ├── 📄 features.ts
│   ├── 📄 hero-features.ts
│   ├── 📄 limit-bytes.ts
│   ├── 📄 quotes.ts
│   ├── 📄 social-links.ts
│   ├── 📄 steps.ts
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
│   ├── 📁 mail
│   │   ├── 📁 actions
│   │   │   └── 📄 send-email.ts
│   │   └── 📄 nodemailer.ts
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
│   ├── 📄 send-email.ts
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
│   ├── 📁 v1
│   │   ├── 📄 tree-v1.0.0.litcoffee
│   │   └── 📄 tree-v1.1.0.litcoffee
│   └── 📁 v2
├── 📁 types
│   ├── 📄 column-data.ts
│   ├── 📄 contact-form-data.ts
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
