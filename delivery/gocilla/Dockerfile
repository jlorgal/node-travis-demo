FROM centos

# Copy repos (to install mongodb)
COPY yum.repos.d /etc/yum.repos.d
# Install EPEL repo
RUN rpm -iUvh http://dl.fedoraproject.org/pub/epel/7/x86_64/e/epel-release-7-5.noarch.rpm

# Install mongo
# Also install docker utilities (to get the external IP and port)
RUN yum install -y mongodb-org-3.0.7 mongodb-org-server-3.0.7 mongodb-org-shell-3.0.7 \
                   git tar gettext \
                   libxml2-devel libxslt-devel \
                   python-pip \
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

#############################################
# Create a virtual environment with ansible 2
#############################################
RUN pip install virtualenv

RUN su - contint -c " \
    virtualenv -p python ansible && \
    source ansible/bin/activate && \
    pip install --upgrade pip && \
    pip install paramiko==1.15.2 PyYAML==3.11 Jinja2==2.8 httplib2==0.9.1 six==1.9.0 shade==0.13.0 shade-ansible==0.1.0 \
    "

RUN su - contint -c " \
    git clone git@github.com:ansible/ansible.git ansible2-git && \
    cd ansible2-git && \
    git checkout v2.0.0-0.3.beta1 && \
    git submodule update --init --recursive && \
    source ./hacking/env-setup -q \
    "

#############################################

# Ports exposing the service out of the container (range 4990 to 4999).
# If the component is listening to a diferent port, it needs to be mapped with iptables.
# For example, if component service is available at port 4010:
#   iptables -t nat -I PREROUTING -p tcp --dport 4990 -j REDIRECT --to-port 4010
EXPOSE 4990 4991 4992 4993 4994 4995 4996 4997 4998 4999

# Force a foreground task to prevent from stopping the container
CMD ["tail", "-f", "/dev/null"]
