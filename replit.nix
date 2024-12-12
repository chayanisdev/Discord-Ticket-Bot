{ pkgs }: {
  deps = [
    pkgs.nodejs-20_x    # Latest LTS version of Node.js
    pkgs.nodePackages.typescript-language-server
    pkgs.nodePackages.prettier  # For code formatting
    pkgs.nodePackages.eslint    # For code linting
    pkgs.yarn
    pkgs.replitPackages.jest
    pkgs.git            # For version control
    pkgs.esbuild        # Fast bundler
  ];
  env = {
    LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [
      pkgs.libuuid
    ];
    NODE_ENV = "development";
    PATH = "${pkgs.nodejs-20_x}/bin:${pkgs.yarn}/bin:$PATH";
  };
}
