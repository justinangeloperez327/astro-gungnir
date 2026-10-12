Install the SDK and CLI together, then rebuild existing applications with the
matching toolchain. Do not mix historical preview packages with 1.0 headers or
libraries.

## Upgrade an application

1. Download the selected SDK and verify its SHA-256 checksum.
2. Check `gungnir --version` and `gungnirc --version`.
3. Back up application data and preserve `.env`, bootstrap settings and source.
4. Run source checks and `gungnir build`; resolve errors before deployment.
5. Run application tests and preview migration plans before applying migrations.

Use a separate build directory when changing toolchains or adapter features.
Rebuild native application code when the platform, runtime or dependencies change.

See [Installation](release-v1.md) and [SDK Packages](sdk-packages.md) for the
published core SDK and capabilities available from current source.
