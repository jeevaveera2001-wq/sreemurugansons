import os
import zipfile

def create_posix_zip(src_dir, zip_path):
    print(f"Creating POSIX-compliant zip from {src_dir} -> {zip_path}")
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(src_dir):
            for file in files:
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, src_dir)
                posix_path = rel_path.replace('\\', '/')
                zipf.write(full_path, posix_path)
    print(f"Successfully created {zip_path}")

# 1. Frontend static bundle for public_html
create_posix_zip(os.path.abspath('release/public'), os.path.abspath('deploy-hostinger/hostinger-frontend-public_html.zip'))

# 2. Fullstack app bundle (client + server)
create_posix_zip(os.path.abspath('release'), os.path.abspath('deploy-hostinger/hostinger-fullstack-app.zip'))

