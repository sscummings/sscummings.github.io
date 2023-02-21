## Getting started

See: https://jekyllrb.com/

1. Clone this repo

// Additional instructions for MacOS Ventura
// Installing Jekyll on macOS Ventura instructions from https://livid.v2ex.com/guides/2023/01/03/jekyll-macos-ventura.html
a. Run `brew install rbenv ruby-build`
b. Open `~/.zshrc` with `open ~/.zshrc`
c. Add `eval "$(rbenv init - zsh)"`
d. Save file and close. Then run `source ~/.zshrc` to update Zsh.
e. Install a newer version of Ruby with `rbenv install 3.1.3`
f. `cd` into local repo, and activate Ruby version for Jekyll with `rbenv local 3.1.3`
g. Check Ruby version with `ruby -v`
h. Should output `ruby 3.1.3p185 (2022-11-24 revision 1a6b16756e) [arm64-darwin22]`
i. If not, revisit previous steps.

2. Run `gem install bundler jekyll`

// Additional instructions for MacOS Ventura
a. Run `bundle config set --local path 'vendor/bundle'`

4. Run `bundle install`

// Additional instructions for MacOS Ventura
a. In `_config.yml`, add `- vendor/` to `exclude:` list.
b. Add `vendor/` and `.bundle/` to `.gitignore`:

5. Run `bundle exec jekyll serve`
6. Browse to http://localhost:4000