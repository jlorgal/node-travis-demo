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

#############################################
# Install node 4
#############################################
RUN curl -sL https://rpm.nodesource.com/setup_4.x | bash - && \
    yum install -y nodejs \
    			   gcc-c++ make

# Force a foreground task to prevent from stopping the container
CMD ["tail", "-f", "/dev/null"]
