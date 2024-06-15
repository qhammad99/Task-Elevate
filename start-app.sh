if [ ! -d "dbData" ]; then
    mkdir -p dbData
fi
docker-compose up -d