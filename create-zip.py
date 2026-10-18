import os
import zipfile

src_dir = os.path.abspath('release/public')
zip_path = os.path.abspath('deploy-hostinger/hostinger-frontend-public_html.zip')

print(f"Creating POSIX-compliant zip from {src_dir} -> {zip_path}")

with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk(src_dir):
        for file in files:
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, src_dir)
            posix_path = rel_path.replace('\\', '/')
            zipf.write(full_path, posix_path)

print(f"Successfully created {zip_path}")
