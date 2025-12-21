## Next Steps - TODO

### 1. Add Project Screenshots 📸

Desktop (горизонтальные):
1600x900px (16:9) - оптимально для веба
Mobile (вертикальные):
450x800px (9:16) - стандарт мобильных устройств
Cover:
800x600px (4:3) - для правого блока

---

### 3. Stage 1 Preparation (Future)

Foundation is solid. Next stages could include:

- Adding more projects (as they're completed)
- Implementing project filtering/search on `/projects` page
- Adding animation/transitions
- Performance optimization (image optimization, lazy loading)
- SEO enhancements (Open Graph images, structured data)

---

## Technical Notes

### Schema Changes Made

- `role` and `period` changed from `z.string()` to `LocalizedTextSchema`
- All project text content now multilingual by default
- Tests updated to reflect new schema structure

### Migration Path

Old test data had plain strings for role/period:

```ts
role: "Developer" // ❌ Old
```

New structure uses LocalizedText:

```ts
role: { en: "Developer", ru: "Разработчик" }  // ✅ New
```

All project data has been migrated to the new structure.

---

**Status:** Stage 0 complete. Ready for screenshots.
**Last Updated:** 2024-11-30
