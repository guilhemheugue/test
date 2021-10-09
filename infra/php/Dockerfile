FROM php:7.4-fpm-alpine
RUN apk --update --no-cache add gcc musl-dev make git postgresql-dev jpeg-dev zlib-dev libpng-dev libxml2-dev autoconf

RUN pecl install xdebug \
    && docker-php-ext-enable xdebug

RUN docker-php-ext-install pdo && \ 
    docker-php-ext-install pdo_pgsql && \
    docker-php-ext-install gd && \
    docker-php-ext-install simplexml && \
    docker-php-ext-install tokenizer && \
    docker-php-ext-install xml && \
    docker-php-ext-install filter && \
    docker-php-ext-install intl

COPY --from=composer /usr/bin/composer /usr/bin/composer
WORKDIR /var/www/
CMD composer install ;  php-fpm
EXPOSE 9000