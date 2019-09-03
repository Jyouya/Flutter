class ReplyForm {
    constructor(selector) {
        this.replyToNode = $(selector);
        this.node = $(
            `<div class="new-post-container p-3 bd-bottom hover-fade">
                <div class="avatar-container">
                    <img src="/" alt="" onerror="this.src='/images/blank-avatar.jpg';" />
                </div>
                <form class="new-post-data-container pl-3">
                    <textarea type="text" name="content" placeholder="🤔🧠❓" class="new-post-input-field no-scrollbar mb-2"></textarea>
                    <button type="submit" class="button button-special" disabled>Submit</button>
                </form>
                <a class="close-reply">X</a>
            </div>`);

        this.node.appendTo(this.replyToNode);
        
        // Arrow functions to keep this bound when we use them as callbacks
        this.close = () => this.node.remove();
        this.send = async (event) => {
            event.preventDefault();
            await $.post('/api/posts', this.form.serialize());
            // Refresh the page here?
            window.location.reload();
        }

        this.validate = async () => 

        this.form = this.node.find('form').submit(this.send);
        this.children('.close-reply').click(this.close)
    }
}