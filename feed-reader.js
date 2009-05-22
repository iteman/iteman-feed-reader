/**
 * ITEMAN Feed Reader - A jQuery plug-in for populating a feed to a DOM element
 * Copyright (c) 2009 ITEMAN, Inc. All rights reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

jQuery.fn.readFeed = function(config) {
  config = $.extend({
    uri: null,
    limit: null,
    documentClass: null
  }, config);

  var self = this;

  $.ajax({
    url: config.uri,
    dataType: 'xml',
    cache: false,
    success: function(feed) {
      $(feed).find('entry').each(function(i) {
        if (config.limit && i >= config.limit) {
          return false;
        }

        var title = $(this).find('title').text();
        self.append((
          config.documentClass ? '<li class="' + config.documentClass + '">'
                               : '<li>') +
          '<a href="' +
          $(this).find('link').attr('href') +
          '" target="_blank">' +
          $(this).find('title').text() +
          '</a>' +
          '</li>'
        );
      });
    }
  });
};

/**
 * Local Variables:
 * mode: js2
 * coding: iso-8859-1
 * tab-width: 2
 * js2-basic-offset: 2
 * indent-tabs-mode: nil
 * c-hanging-comment-ender-p: nil
 * End:
 */
