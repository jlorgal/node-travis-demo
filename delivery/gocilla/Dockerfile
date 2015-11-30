FROM centos

# Copy repos (to install mongodb)
COPY yum.repos.d /etc/yum.repos.d

# Install mongo
# Also install docker utilities (to get the external IP and port)
RUN yum install -y mongodb-org-3.0.7 mongodb-org-server-3.0.7 mongodb-org-shell-3.0.7 \
                   tar gettext \
                   libxml2-devel libxslt-devel \
                   docker-io && \
    yum clean all

# Create contint user and group
RUN groupadd -r contint && useradd -r -g contint contint

# Add certificate key (tdaf.pem)
COPY tdaf.pem /home/contint/.ssh/tdaf.pem
RUN chmod 600 /home/contint/.ssh/tdaf.pem && \
    chown contint:contint /home/contint/.ssh/tdaf.pem

# Add openstack CA certificates
COPY openstack /home/contint/openstack
RUN chown -R contint:contint /home/contint/openstack

# Update npm (in 2 steps due to bug)
RUN npm install -g npm@2.14.4 && \
    npm install -g npm

# Fix bug with libxmljs in tartare-chai (https://github.com/polotek/libxmljs/issues/253)
RUN npm config set registry http://artifactory.hi.inet/npm && \
    npm install -g node-gyp

#############################################
# Install nvm
# Preinstalled with 0.10, 0.12 and 4 versions
#############################################
RUN su - contint -c " \
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.28.0/install.sh | bash && \
    . ~/.nvm/nvm.sh && \
    nvm install 0.10 && \
    nvm install 0.12 && \
    nvm install 4 \
    "
