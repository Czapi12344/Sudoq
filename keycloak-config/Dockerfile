FROM quay.io/keycloak/keycloak:latest

ENV KEYCLOAK_ADMIN=admin
ENV KEYCLOAK_ADMIN_PASSWORD=admin

WORKDIR /opt/keycloak

COPY myrealm.json /opt/keycloak/data/import/

ENTRYPOINT ["./bin/kc.sh", "start-dev", "--import-realm"]
