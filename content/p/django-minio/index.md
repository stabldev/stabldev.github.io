---
title: Integrating MinIO Storage with Django
description: Learn how to integrate MinIO with Django using django-storages. This setup makes managing and serving media files simple and efficient.
pubDate: 2025-10-08
categories: ["django", "minio", "selfhosted"]
---

When working with Django projects, you might need a robust, self-hosted object storage system for media files.
[MinIO](https://github.com/minio/minio) is a great lightweight S3-compatible solution that works perfectly with Django through the [django-storages](https://github.com/jschneier/django-storages) library.

## Other Backends

While there are direct django backends such as [django-minio-storage](https://github.com/py-pa/django-minio-storage), [django-minio-backend](https://pypi.org/project/django-minio-backend/), etc.
The reason why we're using [django-storages](https://github.com/jschneier/django-storages) is, it is production ready, widely used and battle tested.

---

## Installation

We're gonna use [boto3](https://github.com/boto/boto3), an AWS sdk for python.
You can install this with `django-storages` with:

```bash
pip install django-storages[s3]
```

---

## Configuration & Settings

First, we need to set the backend provided by `django-storages` as the default backend.
You can see full docs here: https://django-storages.readthedocs.io/en/latest/backends/amazon-S3.html.

```py title=settings.py
STORAGES = {
    "default": {
        "BACKEND": "storages.backends.s3.S3Storage",
        "OPTIONS": {
          ...your_options_here
        },
    },
}
```

Now we need to set few global variables for creds and configs.
Recommended way is to create a `.env` file with the following key=values.

```env title=.env
AWS_ACCESS_KEY_ID=minioadmin
AWS_SECRET_ACCESS_KEY=minioadmin
AWS_STORAGE_BUCKET_NAME=quibble-media-dev-ap-south-1
AWS_S3_ENDPOINT_URL=http://localhost:9000
AWS_S3_REGION_NAME=ap-south-1
```

And, in `settings.py` load them using any loader you like. Here I'm using `django-environ`.

```py title=settings.py
# Setup environment variables
env = environ.Env()
environ.Env.read_env(BASE_DIR / ".env")

# AWS & S3
AWS_ACCESS_KEY_ID = env("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = env("AWS_SECRET_ACCESS_KEY")
AWS_STORAGE_BUCKET_NAME = env("AWS_STORAGE_BUCKET_NAME")
AWS_QUERYSTRING_AUTH = False

AWS_S3_ENDPOINT_URL = env("AWS_S3_ENDPOINT_URL")
AWS_S3_REGION_NAME = env("AWS_S3_REGION_NAME")
AWS_S3_ADDRESSING_STYLE = "path"
AWS_S3_SIGNATURE_VERSION = "s3v4"
AWS_S3_USE_SSL = not DEBUG
```

That's it with the integration/configuration part. Last thing is to run minIO server and give it a test.
Here, I'm creating a docker-compose file to run `minio` server and client.

---

## Docker Integration

Using `minio` client, we can auto-create bucket with the same name we specified in `.env`.
Here is an example docker comopse file:

```yml title=docker-compose.yml
services:
  minio:
    image: minio/minio
    environment:
      MINIO_ROOT_USER: minioadmin
      MINIO_ROOT_PASSWORD: minioadmin
    ports:
      - "9000:9000"
      - "9001:9001"
    command: server /data --console-address ":9001"
    volumes:
      - minio_data:/data

  mc:
    image: minio/mc
    depends_on:
      - minio
    env_file:
      - ./backend-v2/.env
    volumes:
      - ./init-minio.sh:/init-minio.sh:ro
    entrypoint: ["/bin/sh", "/init-minio.sh"]

volumes:
  minio_data:
```

When we run `docker compose up`, this will spin up two services.
A `minio` server which runs on port `9000` and a web console which runs on port `9001` and a `mc` (minio-client) which runs this script:

```sh init-minio.sh
#!/bin/sh
# script to run inside container to make minIO bucket public
mc alias set local http://minio:9000 "$AWS_ACCESS_KEY_ID" "$AWS_SECRET_ACCESS_KEY"
mc mb -p local/"$AWS_STORAGE_BUCKET_NAME" || true
mc anonymous set public local/"$AWS_STORAGE_BUCKET_NAME"
```

This script login with the `username` and `password` we provided and create a bucket with the name we provided and make that bucket public (this public step depends on the requirements).
Now if you visit `http://localhost:9001`, you'll see a bucket with that name created.

And, that's it!
You're all set to start using your new storage backend.

---

## Why MinIO?

* S3 compatibility without relying on AWS
* Full control over your storage infrastructure
* Easy integration with existing Django projects
