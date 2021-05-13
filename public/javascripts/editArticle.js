var emailHeaderConfig = {
    selector: ".tinymce-heading",
    setup: function (editor) {
      editor.on("change", function () {
        tinymce.triggerSave();
      });
    },
    placeholder: "Start your article ...",
    menubar: false,
    inline: true,
    plugins: ["lists", "powerpaste", "autolink"],
    toolbar: "undo redo | bold italic underline",
    valid_elements: "strong,em,span[style],a[href]",
    valid_styles: {
      "*": "font-size,font-family,color,text-decoration,text-align",
    },
    powerpaste_word_import: "clean",
    powerpaste_html_import: "clean",
  };
  
  var emailBodyConfig = {
    selector: ".tinymce-body",
    setup: function (editor) {
      editor.on("change", function () {
        tinymce.triggerSave();
      });
    },
    file_picker_types: "image",
    placeholder: "Write something here",
    menubar: false,
    inline: true,
    plugins: [
      "advlist autolink lists link image charmap print preview anchor",
      "searchreplace visualblocks code fullscreen",
      "insertdatetime media table paste imagetools wordcount",
      "link",
      "lists",
      "autolink",
      "tinymcespellchecker",
    ],
  
    toolbar: [
      "insertfile undo redo | bold italic underline | fontselect fontsizeselect",
      "forecolor backcolor | alignleft aligncenter alignright alignfull | numlist bullist outdent indent",
    ],
    valid_elements: "p[style],strong,em,span[style],a[href],ul,ol,li",
    valid_styles: {
      "*": "font-size,font-family,color,text-decoration,text-align",
    },
    powerpaste_word_import: "clean",
    powerpaste_html_import: "clean",
  };
  
  tinymce.init(emailHeaderConfig);
  tinymce.init(emailBodyConfig);
  