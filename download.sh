URL=`curl https://api.github.com/repos/scriptin/jmdict-simplified/releases/latest | jq -r '.assets | map(select(.name | startswith("jmdict-eng") and endswith("json.tgz"))) | .[0].browser_download_url'`
echo "Downloading from $URL"
curl -C - -LO $URL
tar xf jmdict-eng*json.tgz