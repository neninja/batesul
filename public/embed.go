package public

import "embed"

//go:embed assets/* assets/.vite/*
var FS embed.FS
