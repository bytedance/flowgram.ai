/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

const path = require("path");
const { addLicenseHeader } = require("./license-header");

const src = path.resolve(__dirname, "../../../");
const header = ` Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 SPDX-License-Identifier: MIT`;

if (require.main === module) {
  addLicenseHeader(src, header, {
    includeExts: [
      ".js",
      ".ts",
      ".tsx",
      ".jsx",
      ".mjs",
      ".cjs",
      ".scss",
      ".less",
      ".prisma",
      ".styl",
      ".css",
    ],
    commentPrefix: "/**",
    commentLinePrefix: " *",
    commentSuffix: " */",
    force: false,
  });

  addLicenseHeader(src, header, {
    includeExts: [".sh"],
    commentLinePrefix: "# ",
    force: false,
  });
}
